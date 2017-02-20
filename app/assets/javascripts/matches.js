var Match = {};

$(function() {
    Match = {
        _config: function() {
            this.domMatch = $("#match .games");
            this.addButton = document.getElementById('addGame');
            this.removeButton = document.getElementById('removeGame');
            this.games = document.getElementsByClassName("game");
            this.homePlayer = document.getElementById("home_player").value;
            this.matchForm = $("#match-form");
            this.playerSelect = $("select");
        },

        initialize: function() {
            this._config();
            this._setUpSelectize();
            this._setUpFormValidation();
            this._bindEvents();

            // Add first game
            this.addGame();
        },

        gameHTML: function() {
            var gameNumber = Match.games.length + 1;

            return '<div class="game game-' + gameNumber + '"> \
                <div class="gameTitle"> \
                  Game ' + gameNumber + ' \
                </div> \
                <div class="control-group"> \
                  <div class="team home-team"> \
                    <div class="control-container"> \
                      <label class="control control-radio"> \
                        <input type="radio" name="winning_player[game-' + gameNumber + ']" value="' + this.homePlayer + '" required> \
                        <div class="control-indicator"></div> \
                      </label> \
                    </div> \
                  </div> \
                    \
                  <div class="team away-team"> \
                    <div class="control-container"> \
                      <label class="control control-radio"> \
                        <input type="radio" name="winning_player[game-' + gameNumber + ']" value="foobar"> \
                        <div class="control-indicator"></div> \
                      </label> \
                    </div> \
                  </div> \
                </div> \
              </div>'
        },
        addGame: function() {
            var gamestoAdd = 0;
            this.games.length == 0 ? gamestoAdd = 3 : gamestoAdd = 2;

            if (this.games.length < 5) {
                for (i = 0; i < gamestoAdd; i++) {
                    this.domMatch.append(this.gameHTML.bind(this));
                };
            }

            this._fillAwayTeamData();
        },

        removeGame: function() {
            if (this.games.length > 1) {
                $(".game").last().remove();
                $(".game").last().remove();
            }
        },

        _fillAwayTeamData: function() {
            $(".away-team input[type='radio']").val(this.playerSelect[0].selectize.getValue());
        },

        _bindEvents: function() {
            this.addButton.addEventListener("click", this.addGame.bind(this));
            this.removeButton.addEventListener("click", this.removeGame.bind(this));
        },

        _setUpFormValidation: function() {
            this.matchForm.validate({
                ignore: [':hidden:not([class~=selectized]),:hidden > .selectized, .selectize-control .selectize-input input'],
                errorPlacement: function() {
                    return false;
                },
                highlight: function(element, errorClass) {
                    $element = $(element);

                    if ($element.attr('id') == 'away_player-selectized') {
                        $element.parents('.selectize-input').addClass(errorClass);
                    }
                    else {
                        $element.parents('.control-group').addClass(errorClass);
                    }
                },
                unhighlight: function(element, errorClass) {
                    $element = $(element);

                    if ($element.attr('id') == 'away_player-selectized') {
                        $element.parents('.selectize-input').removeClass(errorClass);
                    }
                    else {
                        $element.parents('.control-group').removeClass(errorClass);
                    }
                }
            })
        },

        _setUpSelectize: function() {
            this.playerSelect.selectize({
                valueField: 'id',
                labelField: 'name',
                searchField: 'name',
                options: [],
                create: false,
                render: {
                    item: function(item, escape) {
                        return '<div>' +
                            (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                            (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                            '</div>';
                    },
                    option: function(item, escape) {
                        var label = item.name || item.email;
                        var caption = item.name ? item.email : null;
                        return '<div>' +
                            (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
                            (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
                            '</div>'; 
                    }
                },
                load: function(query, callback) {
                    if (!query.length) return callback();
                    $.ajax({
                        url: '/users?q=' + encodeURIComponent(query),
                        type: 'GET',
                        error: function() {
                            callback();
                        },
                        success: function(res) {
                            callback(res);
                        }
                    })
                },
                onChange: function(value) {
                    $(".away-team input[type='radio']").val(value);
                }
            })
        }
    }
})

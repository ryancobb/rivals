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
            this._setUpFormValidation();
            this._setUpSelect2();
            this._bindEvents();

            // Add first game
            this.addGame();
        },

        gameHTML: function() {
            var gameNumber = Match.games.length + 1;

            return `<div class="game game-${gameNumber}">
                <div class="gameTitle">
                  Game ${gameNumber}
                </div>
                <div class="control-group">
                  <div class="team home-team">
                    <div class="control-container">
                      <label class="control control-radio">
                        <input type="radio" name="winning_player[game-${gameNumber}]" value="${this.homePlayer}" required>
                        <div class="control-indicator"></div>
                      </label>
                    </div>
                  </div>

                  <div class="team away-team">
                    <div class="control-container">
                      <label class="control control-radio">
                        <input type="radio" name="winning_player[game-${gameNumber}]" value="foobar">
                        <div class="control-indicator"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>`
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
            $(".away-team input[type='radio']").val($("select option:selected").val());
        },

        _bindEvents: function() {
            this.addButton.addEventListener("click", this.addGame.bind(this));
            this.removeButton.addEventListener("click", this.removeGame.bind(this));
            this.playerSelect.on("select2:select", this._fillAwayTeamData);
            this.playerSelect.on('change', function() {
                $(this).valid();
            })
        },

        _setUpFormValidation: function() {
            this.matchForm.validate({
                ignore: [], // enables hidden field validation so select2 works
                errorPlacement: function() {
                    return false;
                },
                highlight: function(element, errorClass) {
                    $element = $(element);

                    switch ($element.prop('nodeName')) {
                        case 'INPUT':
                            $element.parents('.control-group').addClass(errorClass);
                            break;
                        case 'SELECT':
                            $element.siblings('span').addClass(errorClass);
                            break;
                    }
                },
                unhighlight: function(element, errorClass) {
                    $element = $(element);

                    switch ($element.prop('nodeName')) {
                        case 'INPUT':
                            $element.parents('.control-group').removeClass(errorClass);
                            break;
                        case 'SELECT':
                            $element.siblings('span').removeClass(errorClass);
                            break;
                    }
                }
            })
        },

        _setUpSelect2: function() {
            this.playerSelect.select2({
                width: '75%',
                ajax: {
                    url: '/users',
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            q: params.term,
                            notUser: document.getElementById("home_player").value
                        }
                    },
                    processResults: function(data) {
                        return {
                            results: data
                        }
                    }
                },
                minimumInputLength: 2
            });
        }
    }
})

var Match = {};

$(function() {
  // Set up select
  $('select').select2({ 
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

  Match = {
    initialize: function () {
      this.domMatch = $("#match .games");
      this.addButton = document.getElementById('addGame');
      this.removeButton = document.getElementById('removeGame');
      this.games = document.getElementsByClassName("game");
      this.homePlayer = document.getElementById("home_player").value;
      this.matchForm = $("#match-form");
      this.playerSelect = $("select");

      // Add first game
      this.addGame();

      this.bindEvents();
      // this.addButton.click(function() { Match.addGame(); });
      // this.removeButton.click(function() { Match.removeGame(); });
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
                        <input type="radio" name="match_winner[game-${gameNumber}]" value="${this.homePlayer}">
                        <div class="control-indicator"></div>
                      </label>
                    </div>
                  </div>

                  <div class="team away-team">
                    <div class="control-container">
                      <label class="control control-radio">
                        <input type="radio" name="match_winner[game-${gameNumber}]" value="foobar">
                        <div class="control-indicator"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>`},
    addGame: function() {
      var gamestoAdd = 0;
      this.games.length == 0 ? gamestoAdd = 3 : gamestoAdd = 2;

      for(i=0; i < gamestoAdd; i++) {
        this.domMatch.append(this.gameHTML.bind(this));
      }
    },

    removeGame: function() {
      if (this.games.length > 1) {
        $(".game").last().remove();
        $(".game").last().remove();
      }
    },

    submitMatch: function() {
      // Do verifications

      // Modify form data
      
      return true;
    },

    bindEvents: function() {
      this.addButton.addEventListener("click", this.addGame.bind(this));
      this.removeButton.addEventListener("click", this.removeGame.bind(this));
      this.matchForm.submit(this.submitMatch.bind(this));
      this.playerSelect.on("select2:select", function() {
        $(".away-team input[type='radio']").val($("select option:selected").val());
      });
    }
  }
})

var Match = {};

$(function() {
  // Set up select
  $('select').select2({ 
    width: '75%',
    ajax: {
      url: '/users',
      dataType: 'json',
      delay: 250,
      cache: true,
      data: function(params) {
        return {
          q: params.term,
          notUser: document.getElementById("home-player").getAttribute("data")
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
      this.addButton = $("#addGame");
      this.removeButton = $("#removeGame");
      this.games = document.getElementsByClassName("game");
      this.homePlayer = document.getElementById("home-player").getAttribute("data");

      // Add first game
      this.addGame();

      this.addButton.click(function() { Match.addGame(); });
      this.removeButton.click(function() { Match.removeGame(); });
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
                        <input type="radio" name="match_winner[game-${gameNumber}]" value="${Match.homePlayer}">
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
        this.domMatch.append(this.gameHTML);
      }
    },

    removeGame: function() {
      if (this.games.length > 1) {
        $(".game").last().remove();
        $(".game").last().remove();
      }
    }
  }
})

// instantiate the bloodhound suggestion engine
var users = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/users',
  remote: {
    url: '/users?q=%QUERY',
    wildcard: '%QUERY'
  }
});

var Match = {};

$(function() {
  $('.typeahead').typeahead(null, {
    name: 'users',
    displayKey: 'name',
    valueKey: 'id',
    source: users,
    minLength: 3
  });

  $('.typeahead').on('typeahead:selected', function(event, datum) {
  console.log(datum);
  })

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
                        <input type="radio" name="game-${gameNumber}" value="${Match.homePlayer}">
                        <div class="control-indicator"></div>
                      </label>
                    </div>
                  </div>

                  <div class="team away-team">
                    <div class="control-container">
                      <label class="control control-radio">
                        <input type="radio" name="game-${gameNumber}" value="${Match.homePlayer}">
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

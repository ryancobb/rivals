class AddWinningTeamToGames < ActiveRecord::Migration[5.0]
  def change
  	add_column :games, :winning_team, :integer
  end
end

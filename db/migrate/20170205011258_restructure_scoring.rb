class RestructureScoring < ActiveRecord::Migration[5.0]
  def change
  	add_column :matches, :home_team, :integer
  	add_column :matches, :away_team, :integer
  	add_column :games, :winning_team, :integer

  	drop_table :scores
  end
end

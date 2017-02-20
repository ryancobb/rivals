class Match < ApplicationRecord
	validates :home_team, :away_team, presence: true
  belongs_to :home_team, :class_name => "User", :foreign_key => "home_team"
  belongs_to :away_team, :class_name => "User", :foreign_key => "away_team"

  has_many :games

  def home_team_wins
  	games.where(:winning_team => home_team.id).count
  end

  def away_team_wins
  	games.where(:winning_team => away_team.id).count
  end

  def winner
    return home_team if home_team_wins > away_team_wins

    away_team
  end
end

class Match < ApplicationRecord
	validates :home_team, :away_team, presence: true
  has_one :home_team, :class_name => 'User', :foreign_key => 'id', :primary_key => :home_team
  has_one :away_team, :class_name => 'User', :foreign_key => 'id', :primary_key => :away_team
  has_many :games

  def home_team_wins
  	games.where(:winning_team => home_team.id).count
  end

  def away_team_wins
  	games.where(:winning_team => away_team.id).count
  end
end

class MatchesController < ApplicationController

  def index
  end

  def new
  end

  def create
  	match = Match.create(:home_team => match_params[:home_player], 
  						 :away_team => match_params[:away_player])

  	match_params[:winning_player].each do |k,v|
  		match.games.create(:winning_team => v)
  	end
  end

  private

  def match_params
  	params.require([:home_player, :away_player])
  	params.permit(:home_player, :away_player, :winning_player => params[:winning_player].keys)
  end

end

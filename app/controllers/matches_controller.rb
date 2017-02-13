class MatchesController < ApplicationController

  def index
    @matches = Match.includes(:home_team, :away_team, :games).paginate(:page => params[:page])
  end

  def new
  end

  def create
  	@match = Match.new(:home_team => match_params[:home_player], 
  						 :away_team => match_params[:away_player])

    match_created? ? redirect_to(root_path) : render("new")
  end

  private

  def match_params
  	params.require([:home_player, :away_player])
  	params.permit(:home_player, :away_player, :winning_player => params[:winning_player].keys)
  end

  def match_created?
    return false unless @match.save
    return false unless games_created?

    true
  end 

  def games_created?
    match_params[:winning_player].all? do |k,v|
      game = @match.games.new(:winning_team => v)
      game.save
    end
  end
end
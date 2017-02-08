class MatchesController < ApplicationController

  def index
  end

  def new
  	@users = User.all
  end

  def create
 
  end

end

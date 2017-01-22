class UsersController < ApplicationController

  def player_picker
    players = User.fuzzy_search(name: params[:q])

    render json: players.map { |player| { :id => player.id, :name => player.name } }
  end
end

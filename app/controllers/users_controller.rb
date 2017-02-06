class UsersController < ApplicationController

  def player_picker
    players = User.fuzzy_search(name: params[:q]).advanced_search(id: "!#{params[:notUser]}")

    render json: players.map { |player| { :id => player.id, :text => player.name } }
  end
end

class UsersController < ApplicationController

  def player_picker
    players = User.fuzzy_search(name: params[:q]).advanced_search(id: "!#{current_user.id}")

    render json: players.map { |player| { :id => player.id, :name => player.name, :email => player.email } }
  end
end

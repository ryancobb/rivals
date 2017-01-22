Rails.application.routes.draw do
  devise_for :users, :controllers => { registrations: 'registrations' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "matches#index"

  resources :matches do
    resources :games
  end

  get "/users" => "users#player_picker"
end

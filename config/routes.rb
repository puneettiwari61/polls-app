Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

<<<<<<< HEAD
  post '/users' => 'users#create'
  get '/polls' => 'polls#index'
  post '/polls' => 'polls#create'
  get '/polls/:id' => 'polls#show'
  post '/votes' => 'votes#create'
  resource :sessions, only: [:create, :destroy]

=======
>>>>>>> 6c03114... initial commit
  root "home#index"
  get '*path', to: 'home#index', via: :all
  
end

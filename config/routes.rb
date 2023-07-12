Rails.application.routes.draw do
  resources :cards do
    resources :comments, only: [:show, :index] 
  end

  resources :comments do
      resources :users, only: [:index, :show]
  end

  resources :comments
  
  resources :users 


  post '/login', to: 'sessions#create'
  get '/auth', to: 'users#show'
  delete '/logout', to: 'sessions#destroy'
  
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end



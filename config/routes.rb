Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/recipes', to: 'recipes#index' 
      post '/recipes', to: 'recipes#create'
      get '/recipes/:id', to: 'recipes#show'
      delete '/recipes/:id', to: 'recipes#destroy'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "homepage#index"
  get '/*path' => 'homepage#index'
end

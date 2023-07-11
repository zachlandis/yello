class UsersController < ApplicationController
    # wrap_parameters format: []
    skip_before_action :authenticate_user, only: [:create]

    def index
        users = User.all 
        render json: users
    end
    
    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end
    
    def create 
        user = User.create(user_params)
            session[:user_id] = user.id # remember who our user is
            render json: user, status: :ok
    end

    def update
        user = User.find(params[:id])
        user.update(user_params)
        render json: user
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
    end


    private
    
    def user_params
        params.permit(:email, :password)
    end
end

class SessionsController < ApplicationController

    skip_before_action :authenticate_user, only: [:create, :destroy]

    def create  
        #finds the user record based on the email (or username)
        user = User.find_by(email: params[:email])

        # checkes the user record exists. If it does, checks that the password matches the stored password using bcrypt's authenticate method
        if user&.authenticate(params[:password]) 

            # sets the user's ID in the session
            session[:user_id] = user.id 
            render json: user, status: :accepted
        else
            render json: {error: "Login Error"}, status: :unauthorized
        end
    end

    def destroy
        # byebug
        session.delete(:user_id)
        head :no_content
    end
end

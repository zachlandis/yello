class ApplicationController < ActionController::API
    before_action :authenticate_user
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    

    def current_user
        @current_user ||= User.find_by_id(session[:user_id]) #memoization
    end

    def authorized
        return render json: {error: "Not Authorized"}, status: :unauthorized unless session.include? :user_id
    end


    private

    def authenticate_user #check if a user is logged in
        render json: {errors: {User: "Not Authorized"} }, status: :unauthorized unless current_user
    end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages}, status: :unprocessable_entity 
    end
end

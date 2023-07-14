class ApplicationController < ActionController::API
    before_action :authenticate_user
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    

    def current_user
        @current_user ||= User.find_by_id(session[:user_id]) 
        # puts "Current user: #{@current_user}" # Debugging statement
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

    def render_not_found_response
        render json: { error: "Not found"}, status: :not_found
    end
end

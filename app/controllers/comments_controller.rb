class CommentsController < ApplicationController
    before_action :authorized, only: [:update, :destroy]


    def index 
        if params[:card_id]
            card = Card.find(params[:card_id])
            comments = card.comments.order(created_at: :desc)
        else
            comments = Comment.all.order(created_at: :desc)
        end
            render json: comments, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create
        comment = Comment.create(comment_params)
        render json: comment, status: :accepted
    end

    def update
        comment = @current_user.comments.find(params[:id])
        if comment
            comment.update(comment_params)
            render json: comment, status: :accepted
        else
            render json: { error: "Unauthorized"}, status: :unauthorized
        end
    end

    def destroy
        comment = @current_user.comments.find_by_id(params[:id])
        if comment 
            comment.destroy
            head :no_content
        else
            render json: { error: "Unauthorized"}, status: :unauthorized
        end
    end

    private
    
    def comment_params
        params.permit(:body, :card_id, :user_id)
    end
end

class CommentsController < ApplicationController
    before_action :find_comment, only: [:show, :update, :destroy]
    before_action :authenticate_user, only: [:show, :update, :destroy]
    before_action :is_owner?, only: [:update, :destroy]


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
        render json: @comment, status: :ok
    end

    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :accepted
    end

    def update
        if @comment
            @comment.update(comment_params)
            render json: @comment, status: :accepted
        else
            render json: { error: "Unauthorized"}, status: :unauthorized
        end
    end

    def destroy
        if @comment 
            @comment.destroy
            head :no_content
        else
            render json: { error: "Unauthorized"}, status: :unauthorized
        end
    end

    private
    
    def comment_params
        params.permit(:body, :card_id, :user_id)
    end

    def find_comment
        @comment = Comment.find(params[:id])
    end

    def is_owner?
        permitted = @comment.user_id == current_user.id
        render json: { User: "Does not own this"}, status: :forbidden unless permitted
    end

    
end

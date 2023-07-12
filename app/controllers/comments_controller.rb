class CommentsController < ApplicationController

    def index 
        if params[:card_id]
            card = Card.find(params[:card_id])
            comments = card.comments.order(created_at: :desc)
        else
            comments = Comment.all.order(created_at: :desc)
        end
            render json: comments, include: :card, , status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, include: :card, status: :ok
    end

    def create
        comment = Comment.create(comment_params)
        render json: comment, status: :accepted
    end

    def update
        comment = Comment.find(params[:id])
        comment.update(comment_params)
        render json: comment, status: :accepted
    end

    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
    end

    private
    
    def comment_params
        params.permit(:body, :card_id, :user_id)
    end
end

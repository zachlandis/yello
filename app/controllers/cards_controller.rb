class CardsController < ApplicationController

    before_action :find_card, only: [:show, :update, :destroy]

    def index 
        cards = Card.all.order(created_at: :desc) 
        render json: cards, status: :ok
    end

    def show
        render json: @card, status: :ok
    end

    def create 
        card = Card.create!(card_params)
        render json: card, status: :accepted
    end

    def update
        @card.update!(card_params)
        render json: @card, status: :accepted
    end

    def destroy
        @card.destroy
        head :no_content
    end

    private

    def card_params
        params.permit(:card_name, :description)
    end

    def find_card
        @card = Card.find(params[:id])
    end
end

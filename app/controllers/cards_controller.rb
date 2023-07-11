class CardsController < ApplicationController

    def index 
        cards = Card.all.order(created_at: :desc) 
        render json: cards
    end

    def show
        card = Card.find(params[:id])
        render json: card
    end

    def create 
        card = Card.create!(card_params)
        render json: card
    end

    def update
        card = Card.find(params[:id])
        card.update!(card_params)
        render json: card
    end

    def destroy
        card = Card.find(params[:id])
        card.destroy
    end


    private

    def card_params
        params.permit(:card_name)
    end
end

class Card < ApplicationRecord
    has_many :comments, dependent: :destroy
    has_many :users, through: :comments

    validates :card_name, presence: true
end

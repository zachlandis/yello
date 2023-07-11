class Card < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments

    validates :card_name, presence: true
end

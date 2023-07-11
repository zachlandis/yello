class User < ApplicationRecord
    has_secure_password

    has_many :comments
    has_many :cards, through: :comments

    validates :email, presence: true
    validates :email, uniqueness: true

end

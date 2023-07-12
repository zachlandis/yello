class User < ApplicationRecord
    has_secure_password

    has_many :comments, dependent: :destroy
    has_many :cards, through: :comments

    validates :email, presence: true
    validates :email, uniqueness: true

end

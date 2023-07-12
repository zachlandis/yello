class Comment < ApplicationRecord
    belongs_to :user 
    belongs_to :card

    validates :body, presence: true


    def username
        self.user.username
    end
end

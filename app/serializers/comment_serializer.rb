class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :card_id, :created_at, :username

  belongs_to :card
  belongs_to :user
end

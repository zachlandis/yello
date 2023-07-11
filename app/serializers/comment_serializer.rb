class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :card_id

  belongs_to :card
end

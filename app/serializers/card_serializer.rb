class CardSerializer < ActiveModel::Serializer
  attributes :id, :card_name

  has_many :comments
end

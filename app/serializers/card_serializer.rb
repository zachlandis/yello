class CardSerializer < ActiveModel::Serializer
  attributes :id, :card_name, :description

  has_many :comments
end

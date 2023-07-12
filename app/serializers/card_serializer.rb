class CardSerializer < ActiveModel::Serializer
  attributes :id, :card_name, :description

  has_many :comments
  has_many :users
end

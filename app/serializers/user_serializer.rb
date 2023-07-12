class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :cards
  has_many :comments
end

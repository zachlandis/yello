class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username

  has_many :cards
  has_many :comments
end

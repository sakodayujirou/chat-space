class User < ApplicationRecord
  has_many :groups_users
  has_many :groups, through: :groups_users
  has_many :messages
end

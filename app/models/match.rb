class Match < ApplicationRecord
  has_many :games
  has_many :scores, through: :games
end

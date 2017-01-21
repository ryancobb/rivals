class Game < ApplicationRecord
  belongs_to :match
  has_many :scores
end

class Game < ApplicationRecord
	validates :match_id, :winning_team, presence: true
  belongs_to :match
end

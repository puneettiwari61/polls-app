class Poll < ApplicationRecord
  has_many :options, dependent: :destroy
  # belongs_to :user
  has_many :votes, dependent: :destroy
  has_many :voters, through: :votes, source: :user
  
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 200 }
  accepts_nested_attributes_for :options, allow_destroy: true
  

end

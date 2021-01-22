class Poll < ApplicationRecord
  has_many :options, dependent: :destroy
  belongs_to :user
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 200 }
  accepts_nested_attributes_for :options, allow_destroy: true
  

end

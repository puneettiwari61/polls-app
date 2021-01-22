class User < ApplicationRecord
    # has_many :polls, dependent: :destroy
    has_many :votes, dependent: :destroy
    has_many :polls, through: :votes

    before_save { self.email = email.downcase }
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                format: { with: VALID_EMAIL_REGEX },
                uniqueness: true

    has_secure_password
    has_secure_token :authentication_token
    validates :password, presence: true, length: { minimum: 6 }

end

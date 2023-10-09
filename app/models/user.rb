class User < ApplicationRecord
  has_secure_password

  enum role: { USER: 0, ADMIN: 1 }

  def as_json(options = {})
    super(options.merge(except: [:password_digest]))
  end
end

class Api::V1::UsersController < ApplicationController
  skip_before_action: :require_login, only: [:create]

  def create
    user = User.create! user_params
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  private

  def user_params
    params.permit :email, :password, :password_confirmation
  end
end

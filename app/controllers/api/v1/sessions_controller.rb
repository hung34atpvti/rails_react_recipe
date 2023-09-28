class Api::V1::SessionsController < ApplicationController
    skip_before_action :require_login, only: [:create]

  def create
    user = User.find_by email: params[:session][:email].downcase
    if user && user.authenticate(params[:session][:password])
      log_in user
      render json: { message: "Login successfully", user: user}, status: 200
    else
      render json: { message: "Invalid username or password"}, status: 401
    end
  end

  def destroy
    log_out
    render json: { message: "Logout successfully"}, status: 200
  end
end

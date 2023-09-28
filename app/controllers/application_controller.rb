class ApplicationController < ActionController::Base
  include SessionsHelper

  before_action :require_login

  def require_login
    unless logged_in?
      log_out
      render json: { message: "Unauthenticated"}, status: 401
    end
  end
end

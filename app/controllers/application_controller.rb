class ApplicationController < ActionController::Base
  include SessionsHelper

  before_action :require_login

  # Define a mapping of regex patterns to actions and methods
  # Define a mapping of regex patterns to actions
  HTTP_METHOD_TO_ACTION = {
    'GET' => {
      %r{^/api/v\d+/recipes$} => 'ALL_RECIPE',
      %r{^/api/v\d+/recipes-my$} => 'MY_RECIPE',
      %r{^/api/v\d+/recipes-other$} => 'OTHER_RECIPE',
      %r{^/api/v\d+/recipes/\d+$} => 'ONE_RECIPE'
    },
    'POST' => {
      %r{^/api/v\d+/recipes$} => 'CREATE_RECIPE'
    },
    'DELETE' => {
      %r{^/api/v\d+/recipes/\d+$} => 'DELETE_RECIPE'
    }
  }.freeze

  ACTION_TO_ROLE = {
    'ALL_RECIPE' => %w[ADMIN],
    'MY_RECIPE' => %w[ADMIN USER],
    'OTHER_RECIPE' => %w[ADMIN USER],
    'ONE_RECIPE' => %w[ADMIN USER],
    'CREATE_RECIPE' => %w[ADMIN USER],
    'DELETE_RECIPE' => %w[ADMIN USER],
  }.freeze

  def require_login
    unless logged_in?
      log_out
      render json: { message: "Unauthenticated" }, status: 401
    end
  end

  def authorization
    current_role = session[:user_role]
    current_action = detect_action
    Rails.logger.info("current_role #{current_role}")
    Rails.logger.info("current_action #{current_action}")
    if current_action == 'unknown'
      return render json: { message: 'No permission' }, status: 403
    end
    unless ACTION_TO_ROLE[current_action].include?(current_role)
      return render json: { message: 'No permission' }, status: 403
    end
  end

  private

  def detect_action
    Rails.logger.info("request.method #{request.method}")
    Rails.logger.info("request.path #{request.path}")
    HTTP_METHOD_TO_ACTION[request.method].each do |pattern, action|
      return action if request.path.match?(pattern)
    end
    'unknown'
  end
end

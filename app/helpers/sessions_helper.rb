module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
    session[:user_id_expired] = 15.minute.from_now
    session[:user_role] = user.role
  end

  def log_out
    session.delete :user_id
    session.delete :user_id_expired
    session.delete :user_role
  end

  def current_user
    @current_user ||= User.find_by id: session[:user_id]
  end

  def logged_in?
    current_user.present? && Time.now < session[:user_id_expired]
  end
end

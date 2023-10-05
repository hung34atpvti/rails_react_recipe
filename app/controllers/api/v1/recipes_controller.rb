class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show destroy]

  def index
    recipe = Recipe.all.order(created_at: :desc)
    render json: recipe
  end

  def my
    recipe = Recipe.where(user_id: session[:user_id]).order(created_at: :desc)
    render json: recipe
  end

  def other
    recipe = Recipe.where.not(user_id: session[:user_id]).order(created_at: :desc)
    render json: recipe
  end

  def create
    params = recipe_params
    params[:user_id] = session[:user_id]

    if params[:image].present? && params[:image] != "null"
      img_url = save_image_to_server(params[:image])
      if img_url == ""
        return render json: { error: "Failed to save the image" }, status: :unprocessable_entity
      end
      params[:image] = img_url
    end
    params.delete :image
    recipe = Recipe.create!(params)

    if recipe
      return render json: recipe
    end
    Rails.logger.error("Error saving recipe: #{recipe.errors.full_messages}")
    return render json: recipe.errors
  end

  def show
    return render json: @recipe
  end

  def destroy
    if session[:user_id] != @recipe[:user_id]
      return render json: { message: "You cannot delete this recipe" }, status: 403
    end
    @recipe&.destroy
    return render json: { message: "Recipe deleted!" }
  end

  private

  def recipe_params
    params.permit(:name, :image, :ingredients, :instruction)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def save_image_to_server(image_data)
    # Generate a unique filename or use the original filename
    filename = "#{SecureRandom.hex(10)}.jpg"

    # Define the path where the image will be stored on the server
    file_path = Rails.root.join("public", "uploads", filename)

    # Write the image data to the file
    File.open(file_path, "wb") do |file|
      file.write(image_data.read)
    end

    return "/uploads/#{filename}"
  rescue => e
    Rails.logger.error("Error saving image: #{e.message}")
    return ""
  end
end

class ArticlesController < ApplicationController
  include Response
  include ExceptionHandler

  def index
    @articles = Article.all
    json_response(@articles)
  end

  def create
    @article = Article.create!(article_params)
    json_response(@article, :created)
  end

  def show
    json_response(@article)
  end

  def update
    @article.update(article_params)
    head :no_content
  end

  def destroy
    @article.destroy
    head :no_content
  end

  private

  def article_params
    params.permit(:title, :description)
  end

  def set_article
    @article = Todo.find(params[:id])
  end
end

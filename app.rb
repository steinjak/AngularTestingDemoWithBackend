require 'sinatra'
require 'mongo'

helpers do
  def categories
    set :db, "angular-shop-backend" unless settings.db?
    db = Mongo::Connection.new.db(settings.db)
    db.collection("categories")
  end
end

get "/categories/:name" do
  categories.find_one(:_id => params[:name]).to_json
end

get "/categories" do
  categories.find().to_a.to_json
end

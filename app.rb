require 'sinatra'
require 'json'
require 'mongo'

helpers do
  def categories
    begin
      db_name = settings.db
    rescue NoMethodError
      db_name = "angular-shop"
    end
    db = Mongo::Connection.new.db(db_name)
    db.collection("categories")
  end
end

get "/categories/:name" do
  categories.find_one(:id => params[:name]).to_json
end

get "/categories" do
  categories.find().to_a.to_json
end

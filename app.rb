require 'sinatra'
require 'json'
require 'mongo'

set :public_folder, Proc.new { File.join(root, "client/app") }

helpers do
  def categories
    db_name = (settings.respond_to? :db) ? settings.db : "angular-shop"
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

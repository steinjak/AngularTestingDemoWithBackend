require './app.rb'
require 'rspec'
require 'rack/test'
require 'json'
require 'mongo'

set :environment, :test
set :db, "categories-tests"

describe 'The browsing service' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  before(:each) do
    test_data = [{:_id => "food", :name => "Food", :blurb => "Yummy things"},
            {:_id => "sports", :name => "Sports", :blurb => "Sporty things"},
            {:_id => "animals", :name => "Animals", :blurb => "Living things"}]

    connection = Mongo::Connection.new
    db = connection.db("categories-tests")
    @cats = db.collection("categories")
    test_data.each {|c| @cats.insert(c)}
  end

  after(:each) do
    @cats.drop
  end

  it "returns the top-level list of categories" do
    get "/categories"
    last_response.should be_ok
    list = JSON.parse(last_response.body)
    list.map {|c| c["name"]}.sort().should eq(["Animals", "Food", "Sports"])
  end

  it "returns categories by name" do
    get "/categories/food"
    last_response.should be_ok
    cat = JSON.parse(last_response.body)
    cat["name"].should eq("Food")
  end
end

require './app.rb'
require 'rspec'
require 'rack/test'
require 'json'

set :environment, :test

describe 'The browsing service' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it "returns the top-level list of categories" do
    get "/categories"
    last_response.should be_ok
    list = JSON.parse(last_response.body)
    list.length.should eq(3)
    list.map {|c| c[1]["name"]}.sort().should eq(["Animals", "Food", "Sports"])
  end

  it "returns categories by name" do
    get "/categories/food"
    last_response.should be_ok
    cat = JSON.parse(last_response.body)
    cat["name"].should eq("Food")
  end
end

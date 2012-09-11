require 'sinatra'

categories = { :food => {:name => "Food", :blurb => "Yummy things"},
    :sports => {:name => "Sports", :blurb => "Sporty things"},
    :animals => {:name => "Animals", :blurb => "Living things"}
}

get "/categories/:name" do
  categories[params[:name].to_sym].to_json
end

get "/categories" do
  categories.to_json
end

'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeController});
    $routeProvider.when('/categories/:id', {templateUrl: 'partials/category.html', controller: CategoryController});
    $routeProvider.when('/categories', {templateUrl: 'partials/categories.html', controller: BrowseController});
    $routeProvider.when('/cart', {templateUrl: 'partials/cart.html', controller: CartController});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

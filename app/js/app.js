'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: HomeController});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: AboutController});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);

  google.load('visualization', '1', {packages: ['corechart']});
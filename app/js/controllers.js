'use strict';

/* Controllers */


function HomeController() {}

HomeController.$inject = ['$scope','$http',function($scope, $http) {
    google.load('visualization', '1.0', {'packages':['corechart']});
}];


function AboutController() {}

AboutController.$inject = [];

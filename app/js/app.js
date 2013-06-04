'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);





google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['app']);
});
google.load('visualization', '1', {packages: ['corechart']});

var app = angular.module('app', []);

app.directive('pieChart', function ($timeout) {
  return {
    restrict: 'EA',
    scope: {
      title:    '@title',
      width:    '@width',
      height:   '@height',
      data:     '=data',
      selectFn: '&select'
    },
    link: function($scope, $elm, $attr) {

      // Create the data table and instantiate the chart
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Label');
      data.addColumn('number', 'Value');
      var chart = new google.visualization.PieChart($elm[0]);

      draw();

      // Watches, to refresh the chart when its data, title or dimensions change
      $scope.$watch('data', function() {
        draw();
      }, true); // true is for deep object equality checking
      $scope.$watch('title', function() {
        draw();
      });
      $scope.$watch('width', function() {
        draw();
      });
      $scope.$watch('height', function() {
        draw();
      });

      // Chart selection handler
      google.visualization.events.addListener(chart, 'select', function () {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          $scope.$apply(function () {
            $scope.selectFn({selectedRowIndex: selectedItem.row});
          });
        }
      });

      function draw() {
        if (!draw.triggered) {
          draw.triggered = true;
          $timeout(function () {
            draw.triggered = false;
            var label, value;
            data.removeRows(0, data.getNumberOfRows());
            angular.forEach($scope.data, function(row) {
              label = row[0];
              value = parseFloat(row[1], 10);
              if (!isNaN(value)) {
                data.addRow([row[0], value]);
              }
            });
            var options = {'title': $scope.title,
                           'width': $scope.width,
                           'height': $scope.height};
            chart.draw(data, options);
            // No raw selected
            $scope.selectFn({selectedRowIndex: undefined});
          }, 0, true);
        }
      }
    }
  };
});

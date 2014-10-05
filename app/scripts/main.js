(function () {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');

    angular.module('HiremonkApp', ['ngRoute', 'ngAnimate'])

    .config([
    '$locationProvider',
    '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "../views/partials/partial1.html",
          controller: "MainController"
        })
        .otherwise({
           redirectTo: '/'
        });
    }
    ]);

    //Load controller
    angular.module('HiremonkApp')

    .controller('MainController', [
    '$scope',
    function($scope) {
      $scope.testing = "Testing...";
    }
    ]);

}());
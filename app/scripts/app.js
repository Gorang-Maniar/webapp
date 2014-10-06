(function () {

    'use strict';

    require('angular');
    require('angular-route');
    require('angular-animate');

    angular.module('HiremonkApp', ['ngRoute', 'ngAnimate'])

        .config(['$locationProvider','$routeProvider',

                function($locationProvider, $routeProvider) {

                    $routeProvider

                        .when('/login', {
                            templateUrl: '../views/pages/signin.html',
                            controller: 'LoginController'
                        })
                        .when('/', {
                            templateUrl: '../views/pages/home.html',
                            controller: 'HomeController'
                        })
                        /*
                        .when('/dashboard', {
                            templateUrl: 'views/dashboard.html',
                            controller: 'DashboardController',
                            resolve: {
                                user: function(SessionService) {
                                    return SessionService.getCurrentUser();
                                }
                            }
                        })
                        */
                        .otherwise({
                            redirectTo: '/'
                        });


                   // $locationProvider.html5Mode(true);
                }
        ]);

    //Load controller
    angular.module('HiremonkApp')

    .controller('HomeController', [
    '$scope',
    function($scope) {
      $scope.testing = "Testing...";
    }
    ]);

    angular.module('HiremonkApp')

        .controller('LoginController', [
            '$scope','$location',
            function($scope,$location) {
                $scope.testing = "Testing...";
                $scope.location = $location.host();
            }
        ]);


}());
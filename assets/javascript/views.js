'use strict';

/**
 * @ngdoc overview
 * @name homework4App
 * @description
 * # homework4App
 *
 * Main module of the application.
 */
angular
  .module('viewApp')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'template/main.html',
      })
      .when('/about', {
        templateUrl: 'template/about.html',
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  });
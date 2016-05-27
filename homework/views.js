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
  .module('viewApp', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('#', {
        templateUrl: 'test.html',
      })
      .when('#about', {
        templateUrl: '../index.html',
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);
  });

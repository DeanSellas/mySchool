'use strict';

/**
 * @ngdoc overview
 * @name homework4App
 * @description
 * # homework4App
 *
 * Main module of the application.
 */
var app = angular
  .module('mySchoolApp', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'test.html',
      })
      .when('/homework', {
        templateUrl: 'test.html',
      })
      .when('/about', {
        templateUrl: 'about.html',
      })
      .when('/support', {
        templateUrl: 'views/tutorial.html',
      })
      .otherwise({
        redirectTo: '/homework'
      });
  });
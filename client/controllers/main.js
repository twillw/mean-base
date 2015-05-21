'use strict';
/**
 * Main Controller
 */
define(

  // load dependencies
  [
      'app',
  ],

  // define module
  function (app) {

    app.controller('MainCtrl', ['$scope', '$http', '$location', 'authService', function ($scope, $http, $location, authService) {

      $scope.login = function(user) {
        authService.login(user).then(function(res) {
          console.log(res);
        })
      }

    }]);
  });

'use strict';
/**
 * Defines application states for angular-ui-router.
 */
define(

    // load dependencies
    [
        'app'
    ],

    // define module
    function(app) {
      app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider
          //*******HOME STATE*******//
          .state('main', {
            abstract: true,
            views:  {
              '': {
                templateUrl: 'views/main/layout.html',
              }
            }
          })
          // Main Base
          .state('main.base', {
            url: '/',
            views: {
              '@main': {
                templateUrl: 'views/login.html',
                resolve: {
                },
                controller: 'MainCtrl'
              }
            }
          })
      }]);

    });

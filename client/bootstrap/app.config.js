/**
 * App module, providing all top-level application configuration and services.
 */
define(

    // load dependencies
    [
    ],
    ///
    // define module
    function (states) {
        // define app module/dependencies
        var app = angular.module('app',
        [
          'ngCookies',
          'ngResource',
          'ngSanitize',
          'ngAnimate',
          'ui.router'
        ]);

        app.value('appModel', {
          alerts: null,
          breadcrumbs:{},
          initialized : false,
          isLoading: false,
          language: 'en',
          showRegistrationLink: true,
          user: undefined,
        });

        // configure app module
        app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
          $locationProvider.html5Mode(true);
          $httpProvider.interceptors.push('authInterceptor');
          $urlRouterProvider.otherwise('/');
        }])

        .factory('authInterceptor', ['$rootScope', '$q', '$cookies', '$location', function ($rootScope, $q, $cookies, $location) {
          return {
            // Intercept 401s and redirect you to login if wanted
            /*
            responseError: function(response) {
              if(response.status === 401) {
                window.location = '/login';
                // remove any stale tokens
                if ($cookies.token) {
                  delete $cookies['token'];
                }
                return $q.reject(response);
              } else {
                return $q.reject(response);
              }
            }
            */
          };
        }])

        // return app module
        return app;
    });

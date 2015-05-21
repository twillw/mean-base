'use strict';
/**
 * Auth Service
 */
define(

  // load dependencies
  [
      'app'
  ],

  // define module
  function (app) {

    app.factory('authService', ['$location', '$rootScope', '$http', 'userService', '$cookies', '$q', 'appModel', function ($location, $rootScope, $http, userService, $cookies, $q, appModel) {
      var currentUser = {};

      return {

        /**
         * Authenticate user and save token
         */
        login: function(user, callback) {
          var cb = callback || angular.noop;
          var deferred = $q.defer();

          $http.post('/auth/login', {
            email: user.email,
            password: user.password
          })
          .success(function(data) {
            $cookies.token = data.token;
            console.log(data.token);
            currentUser = userService.resource.get({id: data.id, token:data.token}).$promise
              .then(function(user) {
                appModel.user = user;
                deferred.resolve(data);
                return cb();
              });
          })
          .error(function(err) {
            console.log("err: " + err);
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

          return deferred.promise;
        },

        /**
         * Delete access token and user info
         */
        logout: function() {
          if ($cookies.token) {
            delete $cookies['token'];
          }
          appModel.user = null;
          currentUser = {};
        },

        /**
         * Change password
         */
        changePassword: function(oldPassword, newPassword, callback) {
          var cb = callback || angular.noop;

          return userService.resource.changePassword({ id: userService._id }, {
            oldPassword: oldPassword,
            newPassword: newPassword
          }, function(user) {
            return cb(user);
          }, function(err) {
            return cb(err);
          }).$promise;
        },

        /**
         * Gets all available info on authenticated user
         */
        getCurrentUser: function() {
          return userService.resource.get().$promise;
        },

        /**
         * Check if a user is logged in
         */
        isLoggedIn: function() {
          return $cookies.token;
        },

        /**
         * Waits for userService to resolve before checking if user is logged in
         */
        isLoggedInAsync: function(cb) {
          if(currentUser.hasOwnProperty('$promise')) {
            currentUser.$promise.then(function() {
              cb(true);
            }).catch(function() {
              cb(false);
            });
          } else if(currentUser.hasOwnProperty('role')) {
            cb(true);
          } else {
            cb(false);
          }
        },

        /**
         * Check if a user is an admin
         */
        isAdmin: function() {
          return currentUser.role === 'admin';
        },

        /**
         * Get auth token
         */
        getToken: function() {
          if ($cookies.token) {
            return $cookies.token;
          } else {
            return false;
          }
        }
      };
    }]);
  });

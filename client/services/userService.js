'use strict';
/**
 * User Service
 */
define(

  // load dependencies
  [
      'app',
  ],

  // define module
  function (app) {

    app.factory('userService', ['$resource', '$http', '$cookies', function ($resource, $http, $cookies) {

      var statusMap = {
        'main.package': '2 Package',
        'main.booking': '3 Schedule',
        'main.booking.checkout': '4 Checkout'
      };

      return {
        resource: $resource('/auth/users/:id/:controller', {
            id: '@_id'
          },
          {
            get: {
              method: 'GET',
              params: {
                id:'me',
                page: null,
                numResults: null
              }
            },
            changePassword: {
              method: 'PUT',
              params: {
                controller:'password'
              }
            },
            customerList: {
              method: 'GET',
              params: {
                role: 'user',
                token: $cookies.token
              },
              transformResponse: function(data) {
                var customers = [];
                var json = angular.fromJson(data);
                angular.forEach(json.users, function(customer) {
                  customers.push(customer);
                });
                return {customers:customers, total:json.total};
              }
            },
            instructorList: {
              method: 'GET',
              params: {
                role: 'instructor',
                token: $cookies.token
              },
              transformResponse: function(data) {
                var instructors = [];
                var json = angular.fromJson(data);
                angular.forEach(json.users, function(instructor) {
                  instructors.push(instructor);
                });
                return {instructors:instructors, total:json.total};
              }
            },
            changeEmail: {
              method: 'POST',
              params: {
                controller: 'email'
              }
            }
          }),
          // CUSTOM SERVICE CALLS
          localInstructors: function(coords, country, startDate, filterParams, program_id) {
            return $http.get('/auth/localInstructors', {params: {coords: coords, country: country, startDate: startDate, filterParams: filterParams, program_id: program_id}});
          },
          forgotPassword: function(email) {
            return $http.post('/auth/forgotPassword', { email: email });
          },
          updateOntraportStatus: function(customer_id, status) {
            if (statusMap.hasOwnProperty(status)) {
              return $http.post(('/auth/updateStatus/' + customer_id), {newStatus: statusMap[status]});
            } else {
              console.log("No status update for this state");
            }
          }
      }
    }]);
  });

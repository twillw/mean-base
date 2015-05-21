/**
 * App module, providing all top-level application configuration and services.
 */
define(

  // load dependencies
  [
  'app',
  //'config.widgets',
  'app.states',
  //Services
  './services/authService',
  './services/userService',

  //Directives
  './directives/base.js',

  //Widgets

  //Filters
  './filters/filters',

  //Controllers
  './controllers/main'

  ],

    // define module
    function (app) {
     app.run(['$rootScope', '$state', '$location', '$document', 'appModel', 'authService', 'userService', function ($rootScope, $state, $location, $document, appModel, authService, userService) {
    // bind scope
    $rootScope.$state = $state;
    $rootScope.appModel = appModel;

    angular.forEach($rootScope.$state.get(),
      function (state) {
        state.onEnter = function () {
          // STUB
        };
        state.onExit = function () {
          // STUB
        };
             
      });

      // definite initialization handler
      var tryInitializeUnhooks = [];
      var stateChangeComplete = false;
      var userQueryComplete = false;
      var tryInitialize = function () {
        // ignore if wait on state change or user query
        if (stateChangeComplete === false || userQueryComplete === false) {
          return;
        }
        // unregister all initialization listeners
        if (tryInitializeUnhooks !== null) {
          for (var i = 0; i < tryInitializeUnhooks.length; ++i) {
            tryInitializeUnhooks[i]();
          }
          tryInitializeUnhooks = null;
        }

        // mark initialized
        appModel.initialized = true;

        $rootScope.$on('$viewContentLoaded', function() {
          //STUB
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          // STUB
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, $rootScope) {
          //console.log('Success: navigated to state: ' + toState.name + " from " + fromState.name);
          if (appModel.user) {
            userService.updateOntraportStatus(appModel.user._id, toState.name);
          }
          appModel.currentState = toState.name;
          // clear all loading modals
          appModel.isLoading = false;
        });
      };


            // wait for initial state change
      tryInitializeUnhooks.push($rootScope.$on('$locationChangeSuccess', function (event) {
        // skip if not for empty path
        var path = $location.path();
        if (path !== undefined && path.trim().length > 0) {
          return;
        }

        // mark state change complete
        stateChangeComplete = true;

        // try to initialize
        tryInitialize();
      }));
      tryInitializeUnhooks.push($rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        appModel.currentState = toState.name;
        // mark state change complete
        stateChangeComplete = true;

        // try to initialize
        tryInitialize();
      }));
      tryInitializeUnhooks.push($rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        // mark state change complete
        stateChangeComplete = true;

        // try to initialize
        tryInitialize();
      }));

      //*********** Observe model properties *************/
      $rootScope.$watch('appModel.user', function (user,oldValue) {
        // ignore if undefined
        if (user === undefined ) {
          return;
        }

        //user object
        if(user !== oldValue && user !== null  ) {
          //Authenticated
          userQueryComplete = true;

          //$rootScope.$broadcast('userAuthenticated', user);
        }

        if(user === null) {
          // Unauthenticated
          // mark state change complete
          userQueryComplete = true;

        }

        if(appModel.initialized === false) {
            // try to initialize
            tryInitialize();
          }
      },true);

      if (!appModel.user) {
        authService.getCurrentUser()
          .then(function(user) {
            appModel.user = user;
          }, function(err) {
            appModel.user = null;
          });
      }

    }]);

    // return app module
    return app;
  });

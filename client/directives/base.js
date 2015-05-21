'use strict';
/**
 * Admin nav tabs directive
 */
define(

  // load dependencies
  [
      'app',
  ],

  // define module
  function (app) {

/**
 * Tabs for admin interface
 */
    app.directive('meanAppBase', function () {
      return {
        link: function (scope, element, attrs) {
          console.log(scope, element, attrs);
          
        }
      };
    });
  });

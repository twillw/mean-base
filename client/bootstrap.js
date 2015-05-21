
// configure require.js
require.config(
{
    waitSeconds: 2000,
    baseUrl: "/",
    // module paths
    paths:
    {
        'jquery'                            : 'bower_components/jquery/dist/jquery.min',
        'angular'                           : 'bower_components/angular/angular',
        'angular-router'                    : 'bower_components/angular-ui-router/release/angular-ui-router',
        'angular-animate'                   : 'bower_components/angular-animate/angular-animate',
        'angular-cookies'                   : 'bower_components/angular-cookies/angular-cookies',
        'angular-resource'                  : 'bower_components/angular-resource/angular-resource',
        'angular-sanitize'                  : 'bower_components/angular-sanitize/angular-sanitize',
        'app.states'                        : 'bootstrap/app.states',
        'app'                               : 'bootstrap/app.config',
        'app.start'                         : 'bootstrap/app.start',
        'config.widgets'                    : 'resources/config.widgets',
        'lodash'                            : 'bower_components/lodash/dist/lodash'
    },

    // module dependencies
    shim:
    {
        'angular': { 'exports': 'angular' },
        'angular-router':
        {
            deps:
            [
                'angular'
            ]
        },
        'angular-animate':
        {
            deps:
            [
                'angular'
            ]
        },
        'angular-cookies':
        {
            deps:
            [
                'angular'
            ]
        },
        'angular-resource':
        {
            deps:
            [
                'angular'
            ]
        },
        'angular-sanitize':
        {
            deps:
            [
                'angular'
            ]
        },
        'app':
        {
            deps:
            [
                'jquery',
                'angular',
                'angular-router',
                'angular-cookies',
                'angular-animate',
                'angular-sanitize',
                'angular-resource',
                'lodash'
            ]
        },
        'app.states':
        {
            deps:
            [
                'app'
            ]
        },
        'app.start':
        {
            deps:
            [
                'app'
            ]
        }
    },
});

// initiate app bootstrapping
require(

    // define app dependencies
    [
        'app.start'
    ],

    // manually bootstrap document w/ angular
    function ()
    {
        angular.bootstrap(document, ['app']);

    }
);

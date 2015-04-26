/// <reference path="../../typings/angularjs/angular.d.ts" />

export var module = angular
    .module('app', [
        'app.templates',
        'ui.router'
    ])
    .config(compileConfig)
    .config(locationConfig)
    .config(routerConfig);

// @ngInject
function compileConfig($compileProvider, config) {
    // Enable/disable debug data
    // https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(config.debugInfoEnabled || true);
}

// @ngInject
function locationConfig($locationProvider) {
    $locationProvider.html5Mode(false);
}

// @ngInject
function routerConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.partial.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.partial.html'
        })
        .state('todos', {
            url: '/todos',
            templateUrl: 'partials/todos.partial.html'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'partials/chat.partial.html'
        });
}

/**
 * @param injector (optional) used for unit test mocks
 */
export function bootstrap(
    strictDi: boolean, injector?: angular.auto.IInjectorService
) {
    if (!injector) { injector = angular.injector(['ng']); }

    var $http = injector.get('$http');
    return $http.get('/spa-boot.json')
        .then((response) => {
            module.constant('config', response.data);
        }, (errorResponse) => {
            module.constant('config', {});
        })
        // Bootstrap the app regardless of failure...
        // Error handling for missing config will be within app
        .then(() => {
            angular.bootstrap(document, ['app'], {
                strictDi: strictDi
            });
        });
}

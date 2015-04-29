/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

import RouterState = require('../../lib/RouterState');

// @ngInject
function routerConfig(
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider
) {
    $stateProvider
        .state('home',  new RouterState('/home',  'appModule/partials/home.partial.html'))
        .state('login', new RouterState('/login', 'appModule/partials/login.partial.html'))
        .state('chat',  new RouterState('/chat',  'appModule/partials/chat.partial.html'));

    $urlRouterProvider.otherwise('/home');
}

export = routerConfig;

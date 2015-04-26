/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />

// @ngInject
export function routerConfig(
    $stateProvider: angular.ui.IStateProvider,
    $urlRouterProvider: angular.ui.IUrlRouterProvider
) {
    $stateProvider
        .state('home',  new State('/home',  'partials/home.partial.html'))
        .state('login', new State('/login', 'partials/login.partial.html'))
        .state('todos', new State('/todos', 'partials/todos.partial.html'))
        .state('chat',  new State('/chat',  'partials/chat.partial.html'));

    $urlRouterProvider.otherwise('/home');
}

class State implements angular.ui.IState {
    constructor(public url: string, public templateUrl: string) {}
}

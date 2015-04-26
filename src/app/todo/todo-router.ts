/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

// @ngInject
export function routerConfig($stateProvider: angular.ui.IStateProvider) {
    $stateProvider
        .state('todos', new State('/todos', 'todo/todo.partial.html', 'todoController'));
}

class State implements angular.ui.IState {
    constructor(
        public url: string,
        public templateUrl: string,
        public controller?: string,
        public controllerAs?: string
    ) {}
}

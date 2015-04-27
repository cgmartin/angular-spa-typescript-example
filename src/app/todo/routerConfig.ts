/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module todo {
    // @ngInject
    export function routerConfig($stateProvider: ng.ui.IStateProvider) {
        $stateProvider
            .state('todos', new State('/todos', 'todo/todo.partial.html', 'todoController'));
    }

    class State implements ng.ui.IState {
        constructor(public url: string,
                    public templateUrl: string,
                    public controller?: string,
                    public controllerAs?: string) {
        }
    }
}

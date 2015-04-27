/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./TodoStorage.ts"/>
/// <reference path="./routerConfig.ts"/>
/// <reference path="./TodoController.ts"/>
/// <reference path="./todoBlurDirective.ts"/>
/// <reference path="./todoFocusDirective.ts"/>

module todo {
    export class TodoModule {
        private name: string;
        public module: ng.IModule;

        constructor(name?: string) {
            if (!name) {
                name = 'todo';
            }

            this.name = name;
            this.module = angular.module(name, [
                'app.templates',
                'ui.router'
            ])
                .config(todo.routerConfig)
                .controller('todoController', todo.TodoController)
                .directive('todoBlur', todo.todoBlurDirective)
                .directive('todoFocus', todo.todoFocusDirective)
                .service('todoStorage', todo.TodoStorage);
        }

        public getName(): string {
            return this.name;
        }
    }
}

/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import router = require('./todo-router');
import controllers = require('./todo-controllers');
import directives = require('./todo-directives');
import services = require('./todo-services');

export class TodoModule {
    private name: string;
    public module: angular.IModule;

    constructor(name?: string) {
        if (!name) { name = 'todo'; }

        this.name = name;
        this.module = angular.module(name, [
                'app.templates',
                'ui.router'
            ])
            .config(router.routerConfig)
            .controller('todoController', controllers.TodoController)
            .directive('todoBlur', directives.todoBlur)
            .directive('todoFocus', directives.todoFocus)
            .service('todoStorage', services.TodoStorage);
    }

    public getName(): string {
        return this.name;
    }
}

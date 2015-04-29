/// <reference path="../../typings/angularjs/angular.d.ts"/>

import routerConfig = require('./config/routerConfig');
import TodoController = require('./controller/TodoController');
import todoBlurDirective = require('./directive/todoBlurDirective');
import todoFocusDirective = require('./directive/todoFocusDirective');
import TodoStorage = require('./service/TodoStorage');
import IModule = require('../lib/IModule');

class TodoModule implements IModule {
    private name: string;
    public module: ng.IModule;

    constructor(modules?: Array<IModule>,
                name?: string) {

        if (!modules) {
            modules = [];
        }
        if (!name) {
            name = 'todo';
        }

        var dependencies: Array<string> = [
            'app.templates',
            'ui.router'
        ].concat(
            modules.map((m) => m.getName())
        );

        this.name = name;
        this.module = angular
            .module(name, dependencies)
            .config(routerConfig)
            .controller('todoController', TodoController)
            .directive('todoBlur', todoBlurDirective)
            .directive('todoFocus', todoFocusDirective)
            .service('todoStorage', TodoStorage);
    }

    public getName(): string {
        return this.name;
    }
}

export = TodoModule;

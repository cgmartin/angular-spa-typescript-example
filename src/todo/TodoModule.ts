/// <reference path="../../typings/angularjs/angular.d.ts"/>

import routerConfig = require('./config/routerConfig');
import TodoController = require('./controller/TodoController');
import TodoModalController = require('./controller/TodoModalController');
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
            'ui.router',
            'ui.bootstrap'
        ].concat(
            modules.map((m) => m.getName())
        );

        this.name = name;
        this.module = angular
            .module(name, dependencies)
            .config(routerConfig)
            .controller('todoController', TodoController)
            .controller('todoModalController', TodoModalController)
            .directive('todoBlur', todoBlurDirective)
            .directive('todoFocus', todoFocusDirective)
            .service('todoStorage', TodoStorage);
    }

    public getName(): string {
        return this.name;
    }
}

export = TodoModule;

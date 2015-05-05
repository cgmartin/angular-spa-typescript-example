/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import TodoController = require('./TodoController');
import ITodoStorage = require('../service/ITodoStorage');
import TodoItem = require('../model/TodoItem');


interface ITodoScope extends ng.IScope {
    todos: TodoItem[];
    newTodoTitle: string;
    editTodo: TodoItem;
    remainingCount: number;
    doneCount: number;
    allChecked: boolean;
    statusFilter: { completed: boolean; };
    location: ng.ILocationService;
    vm: TodoController;
}

export = ITodoScope;

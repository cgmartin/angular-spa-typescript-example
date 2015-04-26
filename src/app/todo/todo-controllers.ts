/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import models = require('./todo-models');
import services = require('./todo-services');

export class TodoController {

    private todos: models.TodoItem[];

    // dependencies are injected via AngularJS $injector
    // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
    // @ngInject
    constructor(
        private $scope: ITodoScope,
        private todoStorage: services.ITodoStorage,
        private filterFilter
    ) {
        this.todos = $scope.todos = todoStorage.get();

        $scope.newTodo = '';
        $scope.editedTodo = null;
        $scope.statusFilter = null;

        // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
        // for its methods to be accessible from view / HTML
        $scope.vm = this;

        // watching for events/changes in scope, which are caused by view/user input
        // if you subscribe to scope or event with lifetime longer than this controller, make sure you unsubscribe.
        $scope.$watch('todos', () => this.onTodos(), true);

    }

    onTodos() {
        this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
        this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
        this.$scope.allChecked = !this.$scope.remainingCount;
        this.todoStorage.put(this.todos);
    }

    addTodo() {
        var newTodo : string = this.$scope.newTodo.trim();
        if (!newTodo.length) {
            return;
        }

        this.todos.push(new models.TodoItem(newTodo, false));
        this.$scope.newTodo = '';
    }

    editTodo(todoItem: models.TodoItem) {
        this.$scope.editedTodo = todoItem;
    }

    doneEditing(todoItem: models.TodoItem) {
        this.$scope.editedTodo = null;
        todoItem.title = todoItem.title.trim();
        if (!todoItem.title) {
            this.removeTodo(todoItem);
        }
    }

    removeTodo(todoItem: models.TodoItem) {
        this.todos.splice(this.todos.indexOf(todoItem), 1);
    }

    clearDoneTodos() {
        this.$scope.todos = this.todos = this.todos.filter(todoItem => !todoItem.completed);
    }

    markAll(completed: boolean) {
        this.todos.forEach(todoItem => { todoItem.completed = completed; });
    }
}

export interface ITodoScope extends ng.IScope {
    todos: models.TodoItem[];
    newTodo: string;
    editedTodo: models.TodoItem;
    remainingCount: number;
    doneCount: number;
    allChecked: boolean;
    statusFilter: { completed: boolean; };
    location: ng.ILocationService;
    vm: TodoController;
}

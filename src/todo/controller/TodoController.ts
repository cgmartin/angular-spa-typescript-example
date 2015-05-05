/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import ITodoScope = require('./ITodoScope');
import ITodoStorage = require('../service/ITodoStorage');
import TodoItem = require('../model/TodoItem');

class TodoController {

    private todos: TodoItem[];

    // dependencies are injected via AngularJS $injector
    // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
    // @ngInject
    constructor(
        private $scope: ITodoScope,
        private todoStorage: ITodoStorage,
        private filterFilter,
        private $log
    ) {
        this.todos = $scope.todos = todoStorage.get();

        $scope.newTodoTitle = '';
        $scope.editTodo = null;
        $scope.statusFilter = null;

        // 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
        // for its methods to be accessible from view / HTML
        $scope.vm = this;

        // watching for events/changes in scope, which are caused by view/user input
        // if you subscribe to scope or event with lifetime longer than this controller, make sure you unsubscribe.
        $scope.$watch('todos', () => this.onTodos(), true);
    }

    onTodos() {
        this.$scope.remainingCount = this.filterFilter(this.todos, { isComplete: false }).length;
        this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
        this.$scope.allChecked = !this.$scope.remainingCount;
        this.todoStorage.put(this.todos);
    }

    addNewTodo() {
        var newTodoTitle: string = this.$scope.newTodoTitle.trim();
        if (!newTodoTitle.length) {
            return;
        }
        this.todos.push(new TodoItem(newTodoTitle, false));
        this.$scope.newTodoTitle = '';
    }

    removeTodo(todo: TodoItem) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }

    addTodo(todo: TodoItem) {
        if (!todo.title.length) {
            return;
        }

        todo.id = new Date().getTime();
        this.todos.push(todo);
    }

    beginEditTodo(todo: TodoItem) {
        this.$scope.editTodo = todo;
    }

    endEditTodo(todo: TodoItem) {
        this.$scope.editTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
            this.removeTodo(todo);
        }
    }

    toggleCompleted(todoItem: TodoItem) {
        todoItem.isComplete = !todoItem.isComplete;
    }

    markAllCompleted(completed?: boolean) {
        if (completed === undefined) {
            completed = true;
        }
        this.todos.forEach(todoItem => { todoItem.isComplete = completed; });
    }

    clearCompleted() {
        this.$scope.todos = this.todos =
            this.todos.filter(todoItem => !todoItem.isComplete);
    }
}

export = TodoController;

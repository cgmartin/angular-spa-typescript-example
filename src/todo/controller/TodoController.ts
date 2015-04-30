/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import ITodoStorage = require('../service/ITodoStorage');
import TodoItem = require('../model/TodoItem');
import TodoModalController = require('./TodoModalController');

class TodoController {

    private todos: TodoItem[];

    // dependencies are injected via AngularJS $injector
    // controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
    // @ngInject
    constructor(
        private $scope: ITodoScope,
        private todoStorage: ITodoStorage,
        private filterFilter,
        private $modal,
        private $log
    ) {
        this.todos = $scope.todos = todoStorage.get();

        this.$scope.newTodo = { id: undefined, title: '', isComplete: false };
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

    openModal(todo: TodoItem) {
        var modalInstance = this.$modal.open({
            templateUrl: 'todo/partials/todoModalContent.partial.html',
            controller: TodoModalController,
            resolve: {
                todo: () => {
                    return angular.copy(todo);
                }
            }
        });
        modalInstance.result.then((result) => {
            this.$log.debug(result);
            var todo = result.todo;
            if (result.action === 'delete') {
                this.removeTodo(todo);
            } else {
                todo.title = todo.title.trim();
                if (todo.id === undefined) {
                    this.addTodo(todo);
                } else {
                    this.editTodo(todo);
                }
            }
        }, () => {
            this.$log.info('Modal dismissed at: ' + new Date());
        });
    }

    removeTodo(todoItem: TodoItem) {
        this.todos.splice(this.todos.indexOf(todoItem), 1);
    }

    addTodo(todoItem: TodoItem) {
        if (!todoItem.title.length) {
            return;
        }

        todoItem.id = new Date().getTime();
        this.todos.push(todoItem);
    }

    editTodo(todo: TodoItem) {
        var oldTodo = this.todos.filter(
            (i: TodoItem) => { return i.id === todo.id; }
        )[0];
        oldTodo.title = todo.title;
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

interface ITodoScope extends ng.IScope {
    todos: TodoItem[];
    newTodo: TodoItem;
    editedTodo: TodoItem;
    remainingCount: number;
    doneCount: number;
    allChecked: boolean;
    statusFilter: { completed: boolean; };
    location: ng.ILocationService;
    vm: TodoController;
}

export = TodoController;

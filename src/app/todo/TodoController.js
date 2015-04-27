/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="./TodoItem.ts"/>
/// <reference path="./TodoStorage.ts"/>
var todo;
(function (todo) {
    var TodoController = (function () {
        function TodoController($scope, todoStorage, filterFilter) {
            var _this = this;
            this.$scope = $scope;
            this.todoStorage = todoStorage;
            this.filterFilter = filterFilter;
            this.todos = $scope.todos = todoStorage.get();
            $scope.newTodo = '';
            $scope.editedTodo = null;
            $scope.statusFilter = null;
            $scope.vm = this;
            $scope.$watch('todos', function () { return _this.onTodos(); }, true);
        }
        TodoController.prototype.onTodos = function () {
            this.$scope.remainingCount = this.filterFilter(this.todos, { completed: false }).length;
            this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
            this.$scope.allChecked = !this.$scope.remainingCount;
            this.todoStorage.put(this.todos);
        };
        TodoController.prototype.addTodo = function () {
            var newTodo = this.$scope.newTodo.trim();
            if (!newTodo.length) {
                return;
            }
            this.todos.push(new todo.TodoItem(newTodo, false));
            this.$scope.newTodo = '';
        };
        TodoController.prototype.editTodo = function (todoItem) {
            this.$scope.editedTodo = todoItem;
        };
        TodoController.prototype.doneEditing = function (todoItem) {
            this.$scope.editedTodo = null;
            todoItem.title = todoItem.title.trim();
            if (!todoItem.title) {
                this.removeTodo(todoItem);
            }
        };
        TodoController.prototype.removeTodo = function (todoItem) {
            this.todos.splice(this.todos.indexOf(todoItem), 1);
        };
        TodoController.prototype.clearDoneTodos = function () {
            this.$scope.todos = this.todos = this.todos.filter(function (todoItem) { return !todoItem.completed; });
        };
        TodoController.prototype.markAll = function (completed) {
            this.todos.forEach(function (todoItem) {
                todoItem.completed = completed;
            });
        };
        return TodoController;
    })();
    todo.TodoController = TodoController;
})(todo || (todo = {}));

/// <reference path="../../../typings/angularjs/angular.d.ts"/>

import TodoItem = require('../model/TodoItem');

class TodoModalController {

    // @ngInject
    constructor(private $scope: ITodoModalScope,
                private $modalInstance,
                private todo: TodoItem,
                private $log) {

        $log.debug(todo);
        $scope.todo = todo;
        $scope.vm = this;
    }

    ok(action: string) {
        this.$modalInstance.close({action: action, todo: this.todo});
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}

interface ITodoModalScope extends ng.IScope {
    todo: TodoItem;
    vm: TodoModalController;
}

export = TodoModalController;

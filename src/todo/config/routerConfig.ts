/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

import RouterState = require('../../lib/RouterState');

// @ngInject
function routerConfig($stateProvider: ng.ui.IStateProvider) {
    $stateProvider
        .state('todos', new RouterState('/todos', 'todo/partials/todo.partial.html', 'todoController'));
}

export = routerConfig;



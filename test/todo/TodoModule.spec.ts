/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-mocks.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>
/// <reference path="../../typings/sinon/sinon.d.ts"/>

import sinon = require('sinon');
import chai = require('chai');
var expect = chai.expect;
var module = angular.mock.module;

import TodoModule = require('../../src/todo/TodoModule');
import ITodoScope = require('../../src/todo/controller/ITodoScope');
import TodoController = require('../../src/todo/controller/TodoController');
import TodoStorage = require('../../src/todo/service/TodoStorage');

describe('todo module', () => {

    var todoInstance: TodoModule;
    var $controller: ng.IControllerService;
    var scope: ITodoScope;
    var todoStorage: TodoStorage;
    var filterFilter, $log;

    beforeEach(() => { todoInstance = new TodoModule(); });

    it('should create default name', () => {
        expect(todoInstance.getName()).to.eql('todo');
    });

    // Traditional angular integration test example
    describe('todo controller', () => {
        beforeEach(module('todo'));

        beforeEach(inject((_$controller_: ng.IControllerService,
                           $rootScope: ng.IRootScopeService,
                           _todoStorage_: TodoStorage,
                           _filterFilter_,
                           _$log_) => {
            $controller = _$controller_;
            scope = <ITodoScope>$rootScope.$new();
            todoStorage = _todoStorage_;
            filterFilter = _filterFilter_;
            $log = _$log_;
        }));

        it('should allow creation of todo controller', () => {
            var todoController: TodoController = $controller('todoController', {
                $scope: scope,
                todoStorage: todoStorage,
                filterFilter: filterFilter,
                $log: $log
            });
            expect(todoController).to.be.not.null;
            expect(scope.newTodoTitle).to.be.a('string');
            expect(todoController.addNewTodo).to.be.a('function');
        });
    });
});

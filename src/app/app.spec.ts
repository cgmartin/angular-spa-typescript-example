/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-mocks.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;
var module = angular.mock.module;
var inject = angular.mock.inject;
import app = require('./app');

describe('app', () => {
    var $httpBackend;
    var bootConfigRequestHandler;

    beforeEach(inject(($injector) => {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        bootConfigRequestHandler = $httpBackend
            .when('GET', '/spa-boot.json')
            .respond({
                debugInfoEnabled: true,
                apiBaseUrl: '/api/'
            });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('module should bootstrap', inject(($injector) => {
        $httpBackend.expectGET('/spa-boot.json');
        app.bootstrap(false, $injector);
        $httpBackend.flush();
        var appModule = angular.module('app');
        expect(appModule).to.be.an('object');
        expect(app.module).to.eql(appModule);
    }));
});

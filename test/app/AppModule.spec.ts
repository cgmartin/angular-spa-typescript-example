/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/angularjs/angular-mocks.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>
/// <reference path="../../typings/sinon/sinon.d.ts"/>

import sinon = require('sinon');
import chai = require('chai');
var expect = chai.expect;
var inject = angular.mock.inject;
import AppModule = require('../../src/app/AppModule');

describe('app module', () => {
    var appInstance;
    var $httpBackend;
    var bootConfigRequestHandler;

    beforeEach(() => {
        appInstance = new AppModule();
    });

    beforeEach(inject(($injector) => {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        bootConfigRequestHandler = $httpBackend
            .when('GET', '/spa-boot.json')
            .respond({
                isDbugInfoEnabled: true,
                isHtml5ModeEnabled: false,
                isStubsEnabled: false,
                apiBaseUrl: '/api/'
            });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should create default name', () => {
        expect(appInstance.getName()).to.eql('app');
    });

    it('should bootstrap', inject(($injector) => {
        // Clone document in case we want to bootstrap again.
        // Bootstrap is not designed to "unbootstrap", must destroy
        // DOM element to achieve this.
        var documentClone = <Document>document.cloneNode(true);

        $httpBackend.expectGET('/spa-boot.json');
        appInstance.bootstrap(false, documentClone, $injector);
        $httpBackend.flush();

        var appModule = angular.module('app');
        expect(appModule).to.be.an('object');
        expect(appInstance.module).to.eql(appModule);
    }));
});

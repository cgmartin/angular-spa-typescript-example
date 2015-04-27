/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>
/// <reference path="../../typings/sinon/sinon.d.ts"/>
/// <reference path="../../src/app/app-config.ts"/>

//import sinon = require('sinon');
//import chai = require('chai');
var expect = chai.expect;

//import appConfig = require('../../src/app/app-config');

describe('app-config module', () => {
    it('should export', () => {
        expect(app.compileConfig).to.be.a('function');
        expect(app.locationConfig).to.be.a('function');
    });

    it('should configure compileProvider', () => {
        [{
            bootConfig: {debugInfoEnabled: false},
            expected: {debugInfoEnabledCalledWith: false}
        }, {
            bootConfig: {}, // Test default condition
            expected: {debugInfoEnabledCalledWith: true}
        }]
        .forEach((testData) => {
            var bootConfig: app.IBootConfig = testData.bootConfig;
            var compileProvider = {
                debugInfoEnabled: sinon.spy()
            };
            app.compileConfig(<angular.ICompileProvider><any>compileProvider, bootConfig);
            expect(compileProvider.debugInfoEnabled.called).to.be.true;
            expect(compileProvider.debugInfoEnabled.getCall(0)
                .calledWith(testData.expected.debugInfoEnabledCalledWith)).to.be.true;
        });
    });

    it('should configure locationProvider', () => {
        [{
            bootConfig: {html5Mode: true},
            expected: {html5ModeCalledWith: true}
        }, {
            bootConfig: {}, // Test default condition
            expected: {html5ModeCalledWith: false}
        }]
        .forEach((testData) => {
            var bootConfig:app.IBootConfig = testData.bootConfig;
            var locationProvider = {
                html5Mode: sinon.spy()
            };
            app.locationConfig(<angular.ILocationProvider><any>locationProvider, bootConfig);
            expect(locationProvider.html5Mode.called).to.be.true;
            expect(locationProvider.html5Mode.getCall(0)
                .calledWith(testData.expected.html5ModeCalledWith)).to.be.true;
        });
    });
});


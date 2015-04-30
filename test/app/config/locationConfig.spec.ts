/// <reference path="../../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/chai/chai.d.ts"/>
/// <reference path="../../../typings/sinon/sinon.d.ts"/>

import sinon = require('sinon');
import chai = require('chai');
var expect = chai.expect;

import locationConfig = require('../../../src/app/config/locationConfig');
import IBootConfig = require('../../../src/lib/IBootConfig');

describe('app/config', () => {
    describe('locationConfig', () => {

        it('should export', () => {
            expect(locationConfig).to.be.a('function');
        });

        it('should configure locationProvider', () => {
            [{
                bootConfig: {isHtml5ModeEnabled: true},
                expected: {html5ModeCalledWith: true}
            }, {
                bootConfig: {}, // Test default condition
                expected: {html5ModeCalledWith: false}
            }]
                .forEach((testData) => {
                    var bootConfig: IBootConfig = testData.bootConfig;
                    var locationProvider = {
                        html5Mode: sinon.spy()
                    };
                    locationConfig(<ng.ILocationProvider><any>locationProvider, bootConfig);
                    expect(locationProvider.html5Mode.called).to.be.true;
                    expect(locationProvider.html5Mode.getCall(0)
                        .calledWith(testData.expected.html5ModeCalledWith)).to.be.true;
                });
        });
    });
});


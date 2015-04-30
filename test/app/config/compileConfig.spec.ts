/// <reference path="../../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../../typings/chai/chai.d.ts"/>
/// <reference path="../../../typings/sinon/sinon.d.ts"/>

import sinon = require('sinon');
import chai = require('chai');
var expect = chai.expect;

import compileConfig = require('../../../src/app/config/compileConfig');
import IBootConfig = require('../../../src/lib/IBootConfig');

describe('app/config', () => {
    describe('compileConfig', () => {

        it('should export', () => {
            expect(compileConfig).to.be.a('function');
        });

        it('should configure compileProvider', () => {
            [{
                bootConfig: {isDebugInfoEnabled: false},
                expected: {debugInfoEnabledCalledWith: false}
            }, {
                bootConfig: {}, // Test default condition
                expected: {debugInfoEnabledCalledWith: true}
            }]
                .forEach((testData) => {
                    var bootConfig: IBootConfig = testData.bootConfig;
                    var compileProvider = {
                        debugInfoEnabled: sinon.spy()
                    };
                    compileConfig(<ng.ICompileProvider><any>compileProvider, bootConfig);
                    expect(compileProvider.debugInfoEnabled.called).to.be.true;
                    expect(compileProvider.debugInfoEnabled.getCall(0)
                        .calledWith(testData.expected.debugInfoEnabledCalledWith)).to.be.true;
                });
        });

    });
});


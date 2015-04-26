/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;

import appConfig = require('../../src/app/app-config');

describe('app-config module', () => {
    it('should export', () => {
        expect(appConfig.compileConfig).to.be.a('function');
        expect(appConfig.locationConfig).to.be.a('function');
    });

    // TODO: more coverage
});

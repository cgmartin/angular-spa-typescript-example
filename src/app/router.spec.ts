/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;

import router = require('./router');

describe('router module', () => {
    it('should export', () => {
        expect(router.routerConfig).to.be.a('function');
    });

    // TODO: more coverage
});

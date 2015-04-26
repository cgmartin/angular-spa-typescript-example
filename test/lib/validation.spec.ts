/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>

import chai = require('chai');
var expect = chai.expect;

import validation = require('../../src/lib/validation');

describe('validation', () => {

    it('should validate letters', () => {
        var lettersOnlyValidator = new validation.LettersOnlyValidator();
        expect(lettersOnlyValidator.isAcceptable('ABCD')).to.be.true;
        expect(lettersOnlyValidator.isAcceptable('AB12')).to.be.false;
    });

    it('should validate zipcodes', () => {
        var zipCodeValidator = new validation.ZipCodeValidator();
        expect(zipCodeValidator.isAcceptable('ABCD')).to.be.false;
        expect(zipCodeValidator.isAcceptable('12345')).to.be.true;
    });
});

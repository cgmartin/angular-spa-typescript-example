# angular-spa-typescript-example

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
[![Build Status](https://travis-ci.org/cgmartin/angular-spa-typescript-example.svg?branch=master)](https://travis-ci.org/cgmartin/angular-spa-typescript-example)
[![Dependency Status](https://david-dm.org/cgmartin/angular-spa-typescript-example.svg)](https://david-dm.org/cgmartin/angular-spa-typescript-example)
[![devDependency Status](https://david-dm.org/cgmartin/angular-spa-typescript-example/dev-status.svg)](https://david-dm.org/cgmartin/angular-spa-typescript-example#info=devDependencies)

## Synopsis

Demonstrates using TypeScript in a client-side Angular single page application with Mocha unit tests and Gulp tasks.

**Caution:** This is an experimental playground that I'm using to learn Gulp and TypeScript. Use at your own risk.
If you run across anything here that could be done better, I'd love the feedback.

This client project is meant to accompany a set of Node.js microservices (REST webservice, Chat Server, Static Server, Reverse Proxy),
and is designed with portability in mind (see [Twelve Factors](http://12factor.net/)).

Application configuration is separated from the application by an initial `/spa-boot.json` request, which can be
deployed as a file or routed to a backing service (depending on environment).

## Installation

1. Install [Node.js](https://nodejs.org/download/)
1. Install Gulp/Bower/TSD/Karma: `npm -g i gulp bower tsd@next karma`
1. Clone this repo
1. Install dependencies: `npm i`
1. Start the app in dev mode: `npm start`
1. Point browser to <http://localhost:3000/>

After installation, the following actions are available:

* `npm start` : Builds for development, runs a local webserver, and watches for changes.
* `npm test` : Runs TypeScript file linting and unit tests once.
* `karma start` : Runs unit tests continuously, watching for changes.
* `npm run build` : Builds a production distribution under the `dist/` folder, for deployment to a static webserver or CDN.

## Libraries & Tools

The functionality has been implemented by integrating the following 3rd-party tools and libraries:

 - [TypeScript](http://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript
 - [AngularJS v1](http://angularjs.org/): Superheroic JavaScript MVW Framework
 - [Twitter Bootstrap v3](http://getbootstrap.com/): HTML, CSS, and JS framework for developing responsive, mobile first projects on the web
 - [Font Awesome](http://fontawesome.io/): The iconic font and CSS toolkit
 - [Gulp](http://gulpjs.com/): Streaming build system and task runner
 - [Bower](http://bower.io/): A package manager for the web (client-side)
 - [TSD](https://github.com/DefinitelyTyped/tsd): TypeScript Definition manager for DefinitelyTyped
 - [Node.js](http://nodejs.org/api/): JavaScript runtime environment for server-side development
 - [Karma](http://karma-runner.github.io/): Spectacular Test Runner for Javascript
 - [Mocha](http://mochajs.org/): The fun, simple, flexible JavaScript test framework
 - [Sinon](http://sinonjs.org/): Standalone test spies, stubs and mocks for JavaScript

## License

[MIT License](http://cgm.mit-license.org/)  Copyright © 2015 Christopher Martin

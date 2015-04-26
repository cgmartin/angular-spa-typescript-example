# angular-spa-typescript-example

## Synopsis

Demonstrates using TypeScript in a client-side Angular single page application with Mocha unit tests and Gulp tasks.

**Caution:** This is an experimental playground that I'm using to learn Gulp and TypeScript. Use at your own risk.
If you run across anything here that could be done better, I'd love the feedback.

This client project is meant to accompany set of Node.js microservices (REST webservice, Chat Server, Static Server, Reverse Proxy),
and is designed with portability in mind (see [Twelve Factors](http://12factor.net/)).

Application configuration is separated from the application by an initial `/spa-boot.json` request, which can be
deployed as a file or routed to a backing service (depending on environment).

## Installation

1. Install [Node.js](https://nodejs.org/download/)
1. Install Gulp/Bower/TSD/Karma: `npm -g i gulp bower tsd@next karma`
1. Clone this repo
1. Install dependencies: `npm i`

After installation, the following actions are available:

* `npm start` : Builds for development, runs a local webserver, and watches for changes.
* `npm test` : Runs unit tests once.
* `karma start` : Runs unit tests continuously, watching for changes.
* `npm run lint` : Lints TypeScript files (see `tslint.json` for settings).
* `npm run build` : Builds a production distribution under the `dist/` folder, for deployment to static server or CDN.

## Libraries/Tools In Use

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

## License

[MIT License](http://cgm.mit-license.org/)  Copyright © 2015 Christopher Martin

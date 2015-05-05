'use strict';
// Karma configuration
var wiredep = require('wiredep');
var tsify = require('tsify');

module.exports = function karmaConfig(config) {
    var bowerFiles = wiredep({
        devDependencies: true
        //exclude: ['jquery.js', 'bootstrap.js']
    }).js;

    var karmaCfg = {
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

        // list of files / patterns to load in the browser
        files: [].concat(
            bowerFiles,
            ['src/**/*.ts', 'test/**/*.ts', 'src/**/*.partial.html']
        ),

        // list of files to exclude
        exclude: ['src/main.ts'],

        // preprocess matching files before serving them to the browser
        // info: http://karma-runner.github.io/0.10/config/preprocessors.html
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.ts': ['browserify'],
            //'**/*.ts': ['typescript'],
            //'src/**/*.ts': ['coverage'],
            '**/*.partial.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'src/app/',

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'app.templates'
        },

        browserify: {
            debug: false, // NOTE: Enabling this can cause crashes: https://github.com/karma-runner/karma/pull/1098
            plugin: [[tsify, {target: 'ES5'}]]
        },

        // This typescriptPreprocessor was slower to compile than browserify,
        // and had a nasty side effect of rendering js files in the same
        // directories as the ts files, confusing watch processes...
        //
        //typescriptPreprocessor: {
        //    // options passed to the typescript compiler
        //    options: {
        //        sourceMap: false, // (optional) Generates corresponding .map file.
        //        target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        //        //module: 'commonjs', // (optional) Specify module code generation: 'commonjs' or 'amd'
        //        noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
        //        noResolve: true, // (optional) Skip resolution and preprocessing.
        //        removeComments: true // (optional) Do not emit comments to output.
        //    },
        //    // transforming the filenames
        //    transformPath: function(path) {
        //        return path.replace(/\.ts$/, '.js');
        //    }
        //},

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            //'progress',
            'mocha',
            'notify',
            //'coverage' // TODO: Get code coverage working
        ],

        notifyReporter: {
            reportEachFailure: true, // Default: false, Will notify on every failed sepc
            reportSuccess: false     // Default: true, Will notify when a suite was successful
        },

        //coverageReporter: {
        //    dir: './coverage',
        //    reporters: [
        //        {type: 'html', subdir: 'report-html'},
        //        {type: 'lcovonly', subdir: 'report-lcov'},
        //        {type: 'text-summary'}
        //    ]
        //},

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS', 'Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    };

    config.set(karmaCfg);
};

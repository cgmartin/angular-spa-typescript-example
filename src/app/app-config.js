/// <reference path="../../typings/angularjs/angular.d.ts" />
var app;
(function (app) {
    function compileConfig($compileProvider, config) {
        $compileProvider.debugInfoEnabled((config.debugInfoEnabled !== undefined) ? config.debugInfoEnabled : true);
    }
    app.compileConfig = compileConfig;
    function locationConfig($locationProvider, config) {
        $locationProvider.html5Mode((config.html5Mode !== undefined) ? config.html5Mode : false);
    }
    app.locationConfig = locationConfig;
})(app || (app = {}));

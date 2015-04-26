/// <reference path="../../typings/angularjs/angular.d.ts" />

import appConfig = require('./app-config');
import router = require('./router');

export var module = angular
    .module('app', [
        'app.templates',
        'ui.router'
    ])
    .config(appConfig.compileConfig)
    .config(appConfig.locationConfig)
    .config(router.routerConfig);

/**
 * @param domElement (optional) used for unit test mocks
 * @param injector (optional) used for unit test mocks
 */
export function bootstrap(
    strictDi: boolean,
    domElement?: Document,
    injector?: angular.auto.IInjectorService
) {
    if (!injector) { injector = angular.injector(['ng']); }

    var $http = injector.get('$http');
    return $http.get('/spa-boot.json')
        .then((response) => {
            bootstrapApp(response.data, strictDi, domElement);
        }, (errorResponse) => {
            // Bootstrap the app regardless of failure...
            // Error handling for missing config will be within app
            bootstrapApp({}, strictDi, domElement);
        });
}

function bootstrapApp(
    configData: appConfig.IBootConfig,
    strictDi: boolean,
    domElement?: Document
) {
    if (!domElement) { domElement = document; }

    module.constant('config', configData);
    angular.bootstrap(domElement, ['app'], {
        strictDi: strictDi
    });
}

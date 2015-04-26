/// <reference path="../../typings/angularjs/angular.d.ts" />

import appConfig = require('./app-config');
import router = require('./router');

export class App {
    private name: string;
    public module: angular.IModule;

    constructor(
        compileConfig?: any,
        locationConfig?: any,
        routerConfig?: any,
        name?: string
    ) {
        if (!name) { name = 'app'; }

        this.name = name;
        this.module = angular
            .module(name, [
                'app.templates',
                'ui.router'
            ])
            .config(compileConfig || appConfig.compileConfig)
            .config(locationConfig || appConfig.locationConfig)
            .config(routerConfig || router.routerConfig);
    }

    /**
     * @param strictDi
     * @param domElement (optional) used for unit test mocks
     * @param injector (optional) used for unit test mocks
     */
    public bootstrap(
        strictDi: boolean,
        domElement?: Document,
        injector?: angular.auto.IInjectorService
    ): angular.IHttpPromise<any> {
        if (!injector) { injector = angular.injector(['ng']); }

        var $http = injector.get('$http');
        return $http.get('/spa-boot.json')
            .then((response) => {
                this.bootstrapApp(response.data, strictDi, domElement);
            }, (errorResponse) => {
                // Bootstrap the app regardless of failure...
                // Error handling for missing config will be within app
                this.bootstrapApp({}, strictDi, domElement);
            });
    }

    private bootstrapApp(
        configData: appConfig.IBootConfig,
        strictDi: boolean,
        domElement?: Document
    ) {
        if (!domElement) { domElement = document; }

        this.module.constant('config', configData);
        angular.bootstrap(domElement, [this.name], {
            strictDi: strictDi
        });
    }
}

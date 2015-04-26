/// <reference path="../../typings/angularjs/angular.d.ts" />

import appConfig = require('./app-config');
import router = require('./router');

export class App {
    private name: string;
    public module: angular.IModule;

    constructor(name?: string) {
        if (!name) { name = 'app'; }

        this.name = name;
        this.module = angular
            .module(name, [
                'app.templates',
                'ui.router'
            ])
            .config(appConfig.compileConfig)
            .config(appConfig.locationConfig)
            .config(router.routerConfig);
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
    ) {
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

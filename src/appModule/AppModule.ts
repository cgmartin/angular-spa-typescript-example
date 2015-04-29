/// <reference path="../../typings/angularjs/angular.d.ts" />

import compileConfig = require('./config/compileConfig');
import locationConfig = require('./config/locationConfig');
import routerConfig = require('./config/routerConfig');
import IBootConfig = require('../lib/IBootConfig');
import IModule = require('../lib/IModule');

class AppModule implements IModule {
    private name: string;
    public module: ng.IModule;

    constructor(modules?: Array<IModule>,
                name?: string) {

        if (!modules) {
            modules = [];
        }
        if (!name) {
            name = 'app';
        }

        var dependencies: Array<string> = [
            'app.templates',
            'ui.router'
        ].concat(
            modules.map((m) => m.getName())
        );

        this.name = name;
        this.module = angular
            .module(name, dependencies)
            .config(compileConfig)
            .config(locationConfig)
            .config(routerConfig);
    }

    public getName(): string {
        return this.name;
    }

    /**
     * @param strictDi
     * @param domElement (optional) used for unit test mocks
     * @param injector (optional) used for unit test mocks
     */
    public bootstrap(strictDi: boolean,
                     domElement?: Document,
                     injector?: ng.auto.IInjectorService): angular.IHttpPromise<any> {

        if (!injector) {
            injector = angular.injector(['ng']);
        }

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

    private bootstrapApp(configData: IBootConfig,
                         strictDi: boolean,
                         domElement?: Document) {

        if (!domElement) {
            domElement = document;
        }

        this.module.constant('config', configData);
        angular.bootstrap(domElement, [this.name], {
            strictDi: strictDi
        });
    }
}

export = AppModule;

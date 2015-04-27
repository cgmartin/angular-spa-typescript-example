/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="./app-config.ts" />
/// <reference path="./app-router.ts" />
/// <reference path="./todo/TodoModule.ts" />

module app {

    export class App {
        private name: string;
        public module: angular.IModule;

        constructor(name?: string) {
            if (!name) {
                name = 'app';
            }
            this.name = name;

            // Create dependency modules
            var todoModule = new todo.TodoModule();

            this.module = angular.module(name, [
                'app.templates',
                'ui.router',
                todoModule.getName()
            ])
                .config(app.compileConfig)
                .config(app.locationConfig)
                .config(app.routerConfig);
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
                         injector?: ng.auto.IInjectorService): ng.IHttpPromise<any> {
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
}

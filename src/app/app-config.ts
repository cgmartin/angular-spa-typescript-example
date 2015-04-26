/// <reference path="../../typings/angularjs/angular.d.ts" />

/**
 * Application configuration added to angular via a dynamic constant at boot time
 * @see app.ts : bootstrapApp()
 */
export interface IBootConfig {
    debugInfoEnabled?: boolean;
    html5Mode?: boolean;
    apiBaseUrl?: string;
}

// @ngInject
export function compileConfig(
    $compileProvider: angular.ICompileProvider, config: IBootConfig
) {
    // Enable/disable debug data
    // https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(config.debugInfoEnabled || true);
}

// @ngInject
export function locationConfig(
    $locationProvider: angular.ILocationProvider, config: IBootConfig
) {
    $locationProvider.html5Mode(config.html5Mode || false);
}

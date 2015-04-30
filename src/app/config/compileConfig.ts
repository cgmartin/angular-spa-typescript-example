/// <reference path="../../../typings/angularjs/angular.d.ts" />

import IBootConfig = require('../../lib/IBootConfig');

// @ngInject
function compileConfig(
    $compileProvider: angular.ICompileProvider, config: IBootConfig
) {
    // Enable/disable debug data
    // https://docs.angularjs.org/guide/production
    $compileProvider.debugInfoEnabled(
        (config.isDebugInfoEnabled !== undefined) ? config.isDebugInfoEnabled : true
    );
}

export = compileConfig;

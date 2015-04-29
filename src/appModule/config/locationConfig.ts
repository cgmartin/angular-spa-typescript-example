/// <reference path="../../../typings/angularjs/angular.d.ts" />

import IBootConfig = require('../../lib/IBootConfig');

// @ngInject
function locationConfig(
    $locationProvider: angular.ILocationProvider, config: IBootConfig
) {
    $locationProvider.html5Mode(
        (config.html5Mode !== undefined) ? config.html5Mode : false
    );
}

export = locationConfig;

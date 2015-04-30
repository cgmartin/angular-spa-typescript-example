/// <reference path="../../../typings/angularjs/angular.d.ts" />

import IBootConfig = require('../../lib/IBootConfig');

// @ngInject
function locationConfig(
    $locationProvider: angular.ILocationProvider, config: IBootConfig
) {
    $locationProvider.html5Mode(
        (config.isHtml5ModeEnabled !== undefined) ? config.isHtml5ModeEnabled : false
    );
}

export = locationConfig;

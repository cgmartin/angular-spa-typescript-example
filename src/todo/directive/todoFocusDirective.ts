/// <reference path="../../../typings/angularjs/angular.d.ts"/>

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
// @ngInject
function todoFocusDirective($timeout: ng.ITimeoutService): ng.IDirective {
    return {
        link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
            $scope.$watch(attributes.todoFocus, newval => {
                if (newval) {
                    $timeout(() => element[0].focus(), 0, false);
                }
            });
        }
    };
}

export = todoFocusDirective;

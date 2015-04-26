/// <reference path="../../../typings/angularjs/angular.d.ts"/>

/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
export function todoBlur(): ng.IDirective {
    return {
        link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
            element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
            $scope.$on('$destroy', () => { element.unbind('blur'); });
        }
    };
}

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
 */
// @ngInject
export function todoFocus($timeout: ng.ITimeoutService): ng.IDirective {
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

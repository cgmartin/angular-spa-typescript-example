/// <reference path="../../../typings/angularjs/angular.d.ts"/>

/**
 * Directive that executes an expression when the element it is applied to loses focus.
 */
function todoBlurDirective(): ng.IDirective {
    return {
        link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
            element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
            $scope.$on('$destroy', () => { element.unbind('blur'); });
        }
    };
}

export = todoBlurDirective;


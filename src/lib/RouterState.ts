/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />

class RouterState implements ng.ui.IState {
    constructor(
        public url: string,
        public templateUrl: string,
        public controller?: string,
        public controllerAs?: string
    ) {}
}

export = RouterState;

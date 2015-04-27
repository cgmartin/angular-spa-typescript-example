/// <reference path="../../typings/angular-ui-router/angular-ui-router.d.ts" />
var app;
(function (app) {
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', new State('/home', 'partials/home.partial.html'))
            .state('login', new State('/login', 'partials/login.partial.html'))
            .state('chat', new State('/chat', 'partials/chat.partial.html'));
        $urlRouterProvider.otherwise('/home');
    }
    app.routerConfig = routerConfig;
    var State = (function () {
        function State(url, templateUrl) {
            this.url = url;
            this.templateUrl = templateUrl;
        }
        return State;
    })();
})(app || (app = {}));

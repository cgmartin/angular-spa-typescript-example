// Compose the application and bootstrap
import app = require('./app/app');
import appConfig = require('./app/app-config');
import router = require('./app/router');

var myApp = new app.App([
    'app.templates',
    'ui.router'
]);
myApp.module
    .config(appConfig.compileConfig)
    .config(appConfig.locationConfig)
    .config(router.routerConfig);

myApp.bootstrap(true);

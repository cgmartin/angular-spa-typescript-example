// Bootstrap and run the application
import AppModule = require('./appModule/AppModule');
import TodoModule = require('./todoModule/TodoModule');

var todoModule = new TodoModule();
var myApp = new AppModule([todoModule]);

myApp.bootstrap(true);

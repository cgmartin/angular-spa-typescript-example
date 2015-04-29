// Bootstrap and run the application
import AppModule = require('./app/AppModule');
import TodoModule = require('./todo/TodoModule');

var todoModule = new TodoModule();
var myApp = new AppModule([todoModule]);

myApp.bootstrap(true);

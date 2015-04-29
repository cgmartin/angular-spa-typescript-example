import TodoItem = require('../model/TodoItem');

interface ITodoStorage {
    get(): TodoItem[];
    put(todos: TodoItem[]);
}

export = ITodoStorage;

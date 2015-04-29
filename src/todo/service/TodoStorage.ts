import TodoItem = require('../model/TodoItem');
import ITodoStorage = require('./ITodoStorage');

class TodoStorage implements ITodoStorage {

    STORAGE_ID = 'todos-angularjs-typescript';

    get(): TodoItem[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    put(todos: TodoItem[]) {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }
}

export = TodoStorage;

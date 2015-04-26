import models = require('./todo-models');

export class TodoStorage implements ITodoStorage {

    STORAGE_ID = 'todos-angularjs-typescript';

    get (): models.TodoItem[] {
        return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    }

    put(todos: models.TodoItem[]) {
        localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
    }
}

export interface ITodoStorage {
    get (): models.TodoItem[];
    put(todos: models.TodoItem[]);
}

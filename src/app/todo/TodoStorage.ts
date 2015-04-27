/// <reference path="./TodoItem.ts" />

module todo {
    export class TodoStorage implements ITodoStorage {

        STORAGE_ID = 'todos-angularjs-typescript';

        get(): todo.TodoItem[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: todo.TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }
    }

    export interface ITodoStorage {
        get (): todo.TodoItem[];
        put(todos: todo.TodoItem[]);
    }
}

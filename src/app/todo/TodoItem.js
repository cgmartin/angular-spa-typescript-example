var todo;
(function (todo) {
    var TodoItem = (function () {
        function TodoItem(title, completed) {
            this.title = title;
            this.completed = completed;
        }
        return TodoItem;
    })();
    todo.TodoItem = TodoItem;
})(todo || (todo = {}));

class TodoItem {
    public id: number;

    constructor(
        public title: string,
        public isComplete: boolean
    ) { }
}

export = TodoItem;

const Todo = require("./todoLib");

function getAllTodos(req, res) {
    const todos = Todo.getAll();
    res.json(todos);
};

function createTodo(req, res) {
    const {task, completed, dueDate} = req.body;

    const newTodo = Todo.addOne(task, completed, dueDate);

    if (newTodo) res.json(newTodo);
    else res.status(500).json({ message: "Failed to create todo" });
};

function getTodoById(req, res) {
    const todoId = req.params.todoId;
    const todo = Todo.findById(todoId);
    if (todo) res.json(todo);
    else res.status(404).json({ message: `Todo not found by id ${todoId}`});
};

function updateTodo(req, res) {
    const todoId = req.params.todoId;
    
    const {task, completed, dueDate} = req.body;

    const updatedTodo = Todo.updateOneById(todoId, {task, completed, dueDate});

    if (updatedTodo) res.json(updatedTodo);
    else res.status(404).json({ message: `Todo not found by id ${todoId}`});

};

function deleteTodo(req, res) {
    const todoId = req.params.todoId;
    
    const isDeleted = Todo.deleteOneById(todoId);

    if (isDeleted) res.json({ message: "Todo deleted succesfully"});
    else res.status(404).json({ message: `Todo not found by id ${todoId}`})
};

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
};
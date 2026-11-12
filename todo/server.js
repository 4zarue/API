
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

let todos = [];

const states = ["todo", "doing", "done"];

// create todo, post
app.post("/todos", (req, res) => {
    const { title, description, state, dueDate } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required" });
    }

    if (state && !states.includes(state)) {
        return res.status(400).json({ error: "Invalid state" });
    }

    const now = new Date().toISOString();

    const todo = {
        id: uuidv4(),
        title,
        description: description || "",
        state: state || "todo",
        dueDate: dueDate || null,
        createdAt: now,
        updatedAt: now
    };

    todos.push(todo);
    res.status(201).json(todo);
});

// read todos, get
app.get("/todos", (req, res) => {
    const { state } = req.query;

    if (state && !states.includes(state)) {
        return res.status(400).json({ error: "Invalid state" });
    }

    const result = state
        ? todos.filter(todo => todo.state === state)
        : todos;

    res.json(result);
});

// read a todo
app.get("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
});

// update, put
app.put("/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === req.params.id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    const { title, description, state, dueDate } = req.body;

    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Title is required" });
    }

    if (state && !states.includes(state)) {
        return res.status(400).json({ error: "Invalid state" });
    }

    todo.title = title;
    todo.description = description || "";
    todo.state = state || "todo";
    todo.dueDate = dueDate || null;
    todo.updatedAt = new Date().toISOString();

    res.json(todo);
});

// delete
app.delete("/todos/:id", (req, res) => {
    const index = todos.findIndex(t => t.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }

    todos.splice(index, 1);
    res.json({ message: "Todo deleted" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

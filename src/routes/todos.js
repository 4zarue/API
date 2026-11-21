import express from 'express'
import { getTodos, getTodoById, createTodo, updateTodo } from '../services/todos.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(getTodos(req.query.state))
})

router.get('/:id', (req, res) => {
    const todo = getTodoById(req.params.id)
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' })
    }
    return res.json(todo)
})

router.post('/', (req, res) => {
    const todo = createTodo(req.body)
    if (!todo) {
        return res.status(400).json({ error: 'Invalid todo' })
    }
    return res.status(201).json(todo)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    if (!getTodoById(id)) {
        return res.status(404).json({ error: 'Todo not found' })
    }

    const todo = updateTodo(id, req.body)
    if (!todo) {
        return res.status(400).json({ error: 'Invalid todo update' })
    }
    return res.json(todo)
})

export default router
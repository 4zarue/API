import { describe, test, beforeEach } from "node:test"
import assert from "node:assert/strict"
import { getAllUsers, getUserById } from '../src/services/users.js'
import { doLogin } from "../src/services/auth.js"
import { getTodos, getTodoById, createTodo, updateTodo, resetTodos } from '../src/services/todos.js'

describe('User Service Tests', () => {
    test('getAllUsers should return an array of users', () => {
        const users = getAllUsers()
        assert.equal(users.length, 2)
        assert.ok(users.some(user => user.name === 'Alice'))
    })

    test('Should find user by ID', () => {
        const users = getAllUsers()
        const user = getUserById(users[0].id)
        assert.deepStrictEqual(user, users[0])
    })

    test('Should return undefined for non-existing user ID', () => {
        const user = getUserById('non-existing-id')
        assert.equal(user, undefined)
    })
})

describe('Authentication service', () => {
    test('returns a bearer token for valid credentials', () => {
        const result = doLogin('pk', 'kissa')
        assert.equal(result.user, 'pk')
        assert.equal(result.token_type, 'Bearer')
        assert.ok(result.access_token)
    })

    test('rejects invalid credentials', () => {
        assert.equal(doLogin('pk', 'wrong'), null)
        assert.equal(doLogin('unknown', 'kissa'), null)
    })
})

describe('Todo service', () => {
    beforeEach(() => resetTodos())

    test('lists todos and filters by state', () => {
        assert.equal(getTodos().length, 2)
        assert.equal(getTodos('todo').length, 2)
        assert.equal(getTodos('done').length, 0)
    })

    test('finds a todo and returns undefined for unknown ID', () => {
        const todo = getTodos()[0]
        assert.deepEqual(getTodoById(todo.id), todo)
        assert.equal(getTodoById('missing'), undefined)
    })

    test('creates a todo with a trimmed title', () => {
        const todo = createTodo({ title: '  Test task  ', description: 'Details', state: 'todo' })
        assert.equal(todo.title, 'Test task')
        assert.equal(todo.description, 'Details')
        assert.ok(todo.id)
    })

    test('rejects an empty title', () => {
        assert.equal(createTodo({ title: ' ' }), null)
    })

    test('updates allowed fields and rejects invalid updates', () => {
        const todo = getTodos()[0]
        const updated = updateTodo(todo.id, { title: 'Updated' })
        assert.equal(updated.title, 'Updated')
        assert.ok(updated.updatedAt)
        assert.equal(updateTodo(todo.id, { unknown: true }), null)
        assert.equal(updateTodo('missing', { title: 'Updated' }), null)
    })
})
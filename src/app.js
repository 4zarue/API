import express from 'express'
import {verifyToken} from './middleware/verifytoken.js'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import todosRouter from './routes/todos.js'
import authRouter from './routes/auth.js'

const app = express()

// support for json
app.use(express.json())

// define handlers for various routes
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/auth', authRouter)
app.use('/users', verifyToken, usersRouter)

// export the app object to server.js where we referred to this
export default app

import express from 'express'
import {
    getAllUsers,
    getUserById
} from '../services/users.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(getAllUsers())
})

router.get('/:id', ( req, res ) => {
    const user = getUserById(req.params.id)
    if ( !user )
        return res.status(404).json({error: "User not found"})
    else
        return res.json( user )
})

export default router
import express from 'express'
import {doLogin} from '../services/auth.js'

const router = express.Router()

router.post('/', (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required'
        })
    }

const result = doLogin(username, password)

if( !result ) {
    return res.status(401).json({
        error: 'Invalid credential'
    })
}

return res.status(200).json(result)

})


export default router
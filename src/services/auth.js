import jwt from 'jsonwebtoken'
import { getAuthUser } from '../database/auth.js'

const authUsers = [
    { username: 'pk', password: 'kissa'},
    { username: 'ja', password: 'sala'}
]

export function doLogin(username, password) {
    const user = getAuthUser(username)

    if (user && user.password === password) {
        const token = jwt.sign(
            { username: username }, 'my_secret_key',
            { expiresIn: '1h' })

        return ({
            "user": username,
            "access_token": token,
            "token_type": "Bearer",
            "expires_in": 3600
        })
    } else {
        return null
    }
}
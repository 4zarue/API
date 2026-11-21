import jwt from 'jsonwebtoken'
import { getAuthUser  } from '../database/auth.js'
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers('Authorization')

    if(!authHeader || !authHeader.toLowerCase.startsWith('bearer')) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }

    const token = authHeader.substring(7) // remove 'Bearer' prefix

    try {
        const decodedToken = jwt.verify(token, 'my_secret_key')
        if(!getAuthUser(decodedToken.sub)) {
            return res.status(401).json({
                error: 'Unauthorized'
            })
        }

        req.user = decodedToken.sub
        next()
    } catch (err) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
}
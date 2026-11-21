import { v4 as uuidv4 } from 'uuid'

//simulate the database
const users = [
    {id: uuidv4(), name: 'Alice'},
    {id: uuidv4(), name: 'Bob'}
]

export function getAllUsers() {
    return( users )
}

export function getUserById(id) {
    return users.find( anItem => anItem.id === id )
}


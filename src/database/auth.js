const authUsers = [
    { username: 'pk', password: 'kissa'},
    { username: 'ja', password: 'sala'}
]

export const getAuthUser = (username) => {
    return authUsers.find(u => u.username === username)
}
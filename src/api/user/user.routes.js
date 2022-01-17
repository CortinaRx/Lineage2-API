const UserRoutes = require('express').Router()
const { isAdmin } = require('../../middlewares/auth')
const { postNewUser, loginUser, logoutUser, getUser } = require('./user.controller')

UserRoutes.post('/', postNewUser)
UserRoutes.post('/login', loginUser)
UserRoutes.post('/logout', [isAdmin], logoutUser)
UserRoutes.get('/:id', [isAdmin], getUser)

module.exports = UserRoutes
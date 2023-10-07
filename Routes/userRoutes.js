const Router = require('express').Router()
const {registerController, loginController } = require('../controllers/userControllers')

Router.post('/register',registerController)

Router.post('/login',loginController)

module.exports = Router
const Router = require('express').Router()
const { 
    getNote ,
    postNote,
    getNotes,
    deleteNote,
    updateNote
  } = require('../controllers/appControllers')

const validateToken = require('../middlewares/validateToken')

Router.use(validateToken)

Router.route('/').get(getNotes).post(postNote)
Router.route('/:id').get(getNote).put(updateNote).delete(deleteNote)


module.exports = Router
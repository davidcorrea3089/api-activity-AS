const express = require('express')
const router = express.Router()
const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')
const auth = require('../middlewares/auth.middleware')
const upload = require('../config/multer.config')

//Routes
router.get('/posts', auth.isAuthenticated, posts.list)
router.post('/posts', auth.isAuthenticated, upload.single('image'), posts.create)
router.get('/posts/:id', auth.isAuthenticated, posts.detail)
router.patch('/posts/:id', auth.isAuthenticated, posts.update)
router.delete('/posts/:id', auth.isAuthenticated, posts.delete)

router.post('/users', users.create)
router.get('/users/:id/validate', users.validate)
router.post('/login', users.login)
router.post('/logout', users.logout)

module.exports = router
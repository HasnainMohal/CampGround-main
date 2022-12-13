const express = require('express')
const router = express.Router()
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')

router.get('/register', users.registerForm)
router.post('/register', catchAsync(users.register))
router.get('/login', users.loginForm)
//Use keepSessionInfo: true for new passport version 
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true, }), users.Aclogin)
router.get('/logout', users.logout)

module.exports = router
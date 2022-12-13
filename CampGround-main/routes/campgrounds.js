if(process.env.NODE_ENV !=="production"){
    require('dotenv').config()
}
const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn,validateCampground,isAuthor} = require('../middleware')
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage})

router.get('/',catchAsync(campgrounds.index))
router.get('/home',(campgrounds.home))
router.get('/new',isLoggedIn,campgrounds.newForm)
router.post('/',isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCamp))
router.get('/:id',catchAsync(campgrounds.show))
router.get('/:id/edit',isLoggedIn,upload.array('image'),isAuthor,catchAsync(campgrounds.editForm))
router.put('/:id',isLoggedIn,upload.array('image'),isAuthor,validateCampground,catchAsync(campgrounds.edit))
router.delete('/:id',isLoggedIn,isAuthor,catchAsync(campgrounds.deleteForm))

module.exports = router
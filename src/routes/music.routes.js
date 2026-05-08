const express = require("express");
const musicController = require('../controllers/music.controller')
//add multer as we are uploading this file from form data
const multer = require('multer');
const router = express.Router();


const upload = multer({
    storage : multer.memoryStorage()
})


router.post("/upload",upload.single('music'),musicController.uploadMusic);

module.exports = router; 
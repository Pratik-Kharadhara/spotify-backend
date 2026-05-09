const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');

const jwt = require('jsonwebtoken')
//the uploading  file method using imageKit
const fileUploader = require("../services/music.storage");


async function uploadMusic(req,res){
    

    const { title } = req.body;
    const file = req.file;
   
    //this will give us the URI for the music that we have uploaded
    const  result = await fileUploader(file.buffer.toString("base64"));

    //creating music base on the recieved data
   const music =  await musicModel.create({
        uri: result.url,
        title:title,
        artist:req.user.id
    })
    console.log(req.user);
    console.log(music)

    res.status(201).json({
        message:"music is created",
        music:music
    })

    
}

async function albumCreate(req,res){
   
        const {titile , musicIds }= req.body;
        
        const album = await  albumModel.create({
               title:title,
               musics:musicIds,
               artist:req.user.id
        })      

        res.status(201).json({
            message:"albulm created",
            album:{
                id: album._id,
                titile:album.title,
                artist:album.artist,
                musics:album.musics
            }
        })
     
}

module.exports = { uploadMusic }
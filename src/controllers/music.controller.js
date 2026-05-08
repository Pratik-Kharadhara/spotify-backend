const musicModel = require('../models/music.model');
const albumModel = require('../models/album.model');

const jwt = require('jsonwebtoken')
//the uploading  file method using imageKit
const fileUploader = require("../services/music.storage");


async function uploadMusic(req,res){
    
    //checking the token if its correct or not 
    const token = req.cookies.token

    //if token is not recieved
    if(!token) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
try{
    //verifying token 
    const decoded= jwt.verify(token,process.env.JWT_SECRET); //this return the all the data associates with the given token
    if(!decoded.role=="artist"){
        return res.status(403).json({
            message:"you dont have access to upload music"
        })
    }


    const { title } = req.body;
    const file = req.file;
   
    //this will give us the URI for the music that we have uploaded
    const  result = await fileUploader(file.buffer.toString("base64"));

    //creating music base on the recieved data
   const music =  await musicModel.create({
        uri: result.url,
        title:title,
        artist:decoded.id
    })
    console.log(decoded);
    console.log(music)

    res.status(201).json({
        message:"music is created",
        music:music
    })
    }
    catch(e){
        console.log(e)
    return res.status(401).json({
        message:"unauthorized"
    })
}
    
}

async function albumCreate(req,res){
    //checking for the token 
    const token = req.cookies.token;

    if(!token){
        res.status(409).json({
            message:"unAutho-Rized"
        })
    }
    try{

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        //if true decoded will return every detail regarding to the user of that token
        if(!decoded.role=="artist"){
            res.status(403).json({
                mesagge:"you're not allowed to make a album"
            })
        }   
        const {titile , musicIds }= req.body;
        
        const album = await  albumModel.create({
               title:title,
               musics:musicIds,
               artist:decoded.id
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
    catch(err){
        res.status(409).json({
            message:"you dont have acces to create album"
        })
    }
     
}

module.exports = { uploadMusic }
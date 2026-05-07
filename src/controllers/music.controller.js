const musicModel = require('../models/music.model');
const jwt = require('jsonwebtoken')


async function uploadMusic(res,req){
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
    if(!decoded){
        return res.status(403).json({
            message:"you dont have access to upload music"
        })
    }

}catch(e){
    return res.status(401).json({
        message:unauthorized
    })
}
    
}
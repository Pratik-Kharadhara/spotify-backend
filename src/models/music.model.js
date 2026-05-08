const mongoose = require("mongoose");


const musicShcema = new mongoose.Schema({
    uri:{
        type: String,
        required: true
    },
    title:{
        type: String ,
        required : true
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,//as we will give id(artist)
        ref : "user",//as its from user collection of table
        required :true 
    }
})

const musicModel = mongoose.model("music",musicShcema)

module.exports = musicModel ;
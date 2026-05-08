const ImageKit = require('@imagekit/nodejs');
require('dotenv').config()


const imageKit = new ImageKit({
    privateKey: process.env.ImageKit_Secret,

})

async function uploadFile(file){
    const result = await imageKit.files.upload({
        file,
        fileName:"music_"+ Date.now(),
        folder:"yt-complete-backend/music"
    })

    return result;
}

module.exports = uploadFile 
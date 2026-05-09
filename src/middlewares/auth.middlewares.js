//here the auth middle ware will be 
/*why need ?
as we saw in music.controller for music upload as well as for album upload i need to 
authrize the token for artist same code 
    thats why we gonna write it over here 
*/
const jwt = require('jsonwebtoken');


async function authMiddleWare(req,res,next){
        //check the token if its correct or not 
        const token = req.cookies.token;
        if(!token){
            res.status(403).json({
                message:"Unauthorized"
            })
        }

        try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded.role=="artist"){
            res.status(403).json({
                message:"you don't have permission to acces"
            })
        }
        //middle ware has capability of changing methods in the 
        req.user = decoded ; //we are creating a req.user which have the value of decoded
        

        next(); /*when we will use this in the route after this middle ware running this next 
        function will help to go the next step inthis case that is multer upload.single otherwise
        it wont go (check at the music.routes )
        */
    }
    catch(err){
            console.log(err)
            res.status(403).json({
                message:"Unauthorized"
            })
    }   

}

module.exports= authMiddleWare;
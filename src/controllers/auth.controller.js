const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken")

async function registerUser(req,res){
        //decontruct the  input   
        const {username , email,password,role="user"} = req.body;

        //checking if there is any duplicate user present or not having same email and password
        const isUserExists = await  userModel.findOne({
                //we use $or operator which is a OR operator which will return when either of the condition will satisfies
                       $or:[
                        {username},
                        {email}
                       ]
                        
        })

        if(isUserExists){
                return res.status(409).json({
                        message:"user name or email already exist"
                })
        }
        //creating a user on the basis of the input 
        const user = await userModel.create({
                username,
                email,
                password,
                role
        })


        //creating token basis of the role and user details
        const token = jwt.sign({
                id: user._id,
                role:user.role
        },process.env.JWT_SECRET)

}

module.exports = registerUser;
const userModel = require('../models/user.model');
const jwt = require("jsonwebtoken")
//installing bcrypt for hashing 
const bcrypt = require("bcryptjs");

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
                //user already exists
                return res.status(409).json({
                        message:"user name or email already exist"
                })
        }
        //hashing the password recieved from the user 
        const hash = await bcrypt.hash(password,10) //password is taken from  the user and 10 is the saltrounds

        //creating a user on the basis of the input 
        const user = await userModel.create({
                username,
                email,
                password:hash,
                role
        })


        //creating token basis of the role and user details
        const token = jwt.sign({
                id: user._id, //as we know we have to give one unique value to jwt.sign 
                //only giving id as unique will do our work 
                role:user.role // as role is only user or artist its not nesecesary to be unique
        },process.env.JWT_SECRET)


        //now set the token to the cookie 
        res.cookie("token",token)
        
        //sending the user details as response of this api
        res.status(201).json({
                message:"user registered succefully",
                user:{
                        id:user._id,
                        username:user.username,
                        email: user.email,
                        role: user.role
                }
        })
}


async function loginUser(req,res){
        const {username , email , password} = req.body;
        const user = await userModel.findOne({
                //now it will find on the basis of username or email who are pre-registered
                //as there can be usernam/email one of them can be undefined 
                $or:[   
                        {username},
                        {email}
                ]
        })

        if(!user){ //suppose when both of them missing that means either mail or username wasnot given
                return res.status(401).json({
                        message: "user not found"
                })
        }
        //chcecking if the input password correct or not 
        //by comparing from the bcrypt method 
        const isPassCorrect = await bcrypt.compare(password,user.password);

        //if the password is incorrect its gonna throw error
        if(!isPassCorrect){
                return res.status(401).json({
                        message:"Invalid Credentials"
                })
        }

        //creating token and sending back to the server\
        const token = await jwt.sign({
                id:user._id,
                role:user.role
        },process.env.JWT_SECRET)

        res.cookie("token",token);
        res.status(201).json({
                message:"user found",
                user:{
                        id:user._id,
                        username:user.username,
                        email: user.email,
                        role: user.role
                }
        })

}


module.exports = {registerUser , loginUser};
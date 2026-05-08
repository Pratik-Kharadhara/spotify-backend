const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
        username:{
            type:String,
            required: true,
            unique : true,
        },
        email:{
            type:String,
            unique:true,
            required : true
        },
        password:{
            type: String,
            required : true
        },
        role:{
            type:String,
            enum : ['listner','artist'],
            default: 'listener'

        }
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
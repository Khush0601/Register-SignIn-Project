//mongoose is used to make schema
// this file will contain schema of user only
const mongoose=require("mongoose")
const userschema=new mongoose.Schema({

    name:{
      type:String,
      required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:10,
        lowerCase:true,
    },
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
    },
    userStatus:{
        type:String,
        required:true,
        default:"APPROVED"
    },
    createdAt:{
        type:Date,
        default:()=>{
            return Date.now()
        },
        immutable:true,
    },
    updatedAt:{
        type:Date,
        default:()=>{
            return Date.now()
        }
    }



})

module.exports=mongoose.model('user',userschema)
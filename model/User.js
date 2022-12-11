const mongoose=require("mongoose")
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    blogs:[{type:mongoose.Types.ObjectId,ref:"blogSchema",required:true}]

})
module.exports=mongoose.model('userSchema',userSchema,'userSchema')
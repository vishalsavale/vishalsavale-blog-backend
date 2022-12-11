const userSchema=require("../model/User")
const bcrypt=require("bcryptjs")


const getAllUser=async(req,res,next)=>{
    let users
    try{
        users=await userSchema.find();
    }catch(err){
        console.log(err)
    }

    if(!users){
        return res.status(404).json({message:"No Users Found"})
    }
    return res.status(200).json({users})
}

const signup =async (req,res,next)=>{
    const {name,email,password}=req.body
    let existingUser
    try{
        existingUser=await userSchema.findOne({email})

    }catch(err){
       return console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists1 ! LogIn Insted"})
    }
    const hashPassword=bcrypt.hashSync(password)
    const user=new userSchema({
        name,
        email,
        password:hashPassword,
        blogs:[]
    })

   

    try{
       await user.save()
    }catch(err){
       return console.log(err)
    }
    return res.status(201).json({user})
}     
const login=async(req,res,next)=>{

    const {email,password}=req.body
    let existingUser
    try{
        existingUser=await userSchema.findOne({email})

    }catch(err){
       return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldnt find user by this email"})
    }

    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"})

    }
    return res.status(200).json({message:"LogIn Successfull"})
}   

module.exports={getAllUser,signup,login}
    
const { default: mongoose } = require('mongoose')
const Blog=require('../model/Blog')
const User=require("../model/User")

const getAllBlogs= async (req,res,next)=>{
    let blogs
    try{
        blogs= await Blog.find()
        console.log(blogs)
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"NO blog found"})
    }

    return res.status(200).json({blogs})
}

const addBlog=async (req,res,next)=>{
    const  {title,description,image,user}=req.body
    let existingUser
    try{
        existingUser=await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to find user by this id"})
    }
    const blog=new Blog({
        title,
        description,
        image,
        user,
    })
    try{
        const session=await mongoose.startSession()
        session.startTransaction()
        await blog.save(session)
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
    }catch(err){
      console.log(err)
      return res.status(500).json({message:err})

    }
    return res.status(200).json({blog})
}
const updateBlog=async(req,res,next)=>{
    const {title,description}=req.body
    const blogId=req.params.id
    let blog
    try{
        blog=await Blog.findByIdAndUpdate(blogId,{
            title,
            description
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to find blog"})
    }
    return res.status(200).json({blog})
    
}
const getById=async(req,res,next)=>{
    const blogId=req.params.id
    let blog
    try{
        blog=await Blog.findOne({_id:blogId})
    }catch(err){
        return console.log(err)
    }if(!blog){
        return res.status(500).json({message:"Blog Not Found"})
    }
    return res.status(200).json({blog})
}

const deleteById=async(req,res,next)=>{
    const blogId=req.params.id
    let blog
    try{
        blog=await Blog.findByIdAndRemove(blogId)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to delete blog"})
    }
    return res.status(200).json({message:"sucessfully deleted"})
    
}

module.exports={getAllBlogs,addBlog,updateBlog,getById,deleteById}
const express=require("express")
const {getAllBlogs,addBlog,updateBlog,getById,deleteById}=require("../controllers/blogs-controller")

const blogRouter=express.Router()

blogRouter.get("/",getAllBlogs)
blogRouter.post("/addblog",addBlog)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteById)

module.exports=blogRouter
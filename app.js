const express = require('express')
const mongoose=require('mongoose')
const router=require("./routes/user-routes")

const blogRouter=require("./routes/blogs-routes")

const app=express()


app.use(express.json())
app.use("/api/user",router)
app.use("/api/blog",blogRouter)


mongoose.set('strictQuery', false);
mongoose.connect(
    "mongodb+srv://Admin:yJ3aKYZoJVKwHhKs@cluster0.cbtw5fk.mongodb.net/blog?retryWrites=true&w=majority"
).then(()=>app.listen(5000))
.then(()=>console.log("connected to database and listening 5000 server"))
.catch((err)=>console.log(err))


//yJ3aKYZoJVKwHhKs
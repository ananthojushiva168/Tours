const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2
const TourRouter = require("./route-controller/Tour")
const LoginRouter = require("./route-controller/User")
const ReviewRouter = require("./route-controller/Review")


const app = express()
app.use(express.static('./public')); 
app.use(fileUpload({useTempFiles: true}))




cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})



app.use(cors())

app.use(express.json())



mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://Shiva168:Shiva168@cluster0.eoqqzhe.mongodb.net/?retryWrites=true&w=majority", ()=>{
    console.log("db connected");
})

app.use("/createdata", TourRouter)
app.use("/", LoginRouter)
app.use("/review", ReviewRouter)



app.listen(4000, ()=>{
    console.log("server started on 4000");
})
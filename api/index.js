const express = require("express")
const app = express()
const cors = require("cors")
const { default: mongoose } = require("mongoose")
require("dotenv").config()

app.use(cors({credentials:true,origin:"http://localhost:3000"}))

mongoose.connect(process.env.URI)
const connection = mongoose.connection
connection.once("open",()=>{
    console.log("mongoose connection have been made!")
})

const userRouter = require("./routes/user")
app.use("/user",userRouter)

app.listen(4000, ()=>{
    console.log("4000 port on ")
})
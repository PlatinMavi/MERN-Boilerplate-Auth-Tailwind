const express = require("express")
const router = express.Router()

const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const JWTsecret = process.env.JWTsecret

router.use(express.json())
router.use(cookieParser())

router.post("/register",async (req, res)=>{
    
    try {
        const {username, password} = req.body
        const salt = bcrypt.genSaltSync(10)
        const hp = bcrypt.hashSync(password, salt)
        const UserDoc = await UserModel.create({username,password:hp,salt})
        res.json({requestData:UserDoc})
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

router.post("/login",async (req, res)=>{
    
    const {username, password} = req.body
    const Userdoc = await UserModel.findOne({username})

    if(Userdoc === null){
        res.json({msg:"invalid Username"})
    }else{
        const isOK = bcrypt.compareSync(password, Userdoc.password)
        if (isOK) {
            jwt.sign({username,id:Userdoc._id},JWTsecret,{},(err,token)=>{
                if(err){console.log(err)}
                else{res.cookie("token",token).json({id:Userdoc._id, username})}   
            })
        } else {
            res.json({msg:"invalid password",isOK:isOK})
        }
    }

})

router.get("/profile",(req ,res)=>{
    try{
        const {token} = req.cookies
        jwt.verify(token,JWTsecret, {}, (err,info)=>{
        if(err){res.json()}
        else{res.json(info)}
    })
    }catch(err){
        res.json(err)
    }
    
})

router.post("/logout", (req,res)=>{
    res.cookie("token","").json({msg:"cookie has been reseted"})
})

module.exports = router
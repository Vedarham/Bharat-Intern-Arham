const express =require('express')
const app=express()
const path=require('path')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('./models/user.js')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
dotenv.config()

    app.get('/',(req,res)=>{
        res.render('index')
    })
    
    app.get('/login',(req,res)=>{
        res.render('login')
        })

app.post('/register', async (req,res)=>{
    let {username,name,email,password,age}=req.body;
    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("User Already Exists")
    
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
           let user = await userModel.create({
                username,
                name,
                email,
                age,
                password:hash
            })

            let token = jwt.sign({email:email,userid:user._id},"secretkey")
            res.cookie("token",token)
            res.send("Registered Successfully!")
        })
    })
})

app.post('/login',async (req,res)=>{
    let {email,password}=req.body;
    let user = await userModel.findOne({email})
    if(!user){
        return res.redirect("/login")
    }
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
            
            let token = jwt.sign({email:email,userid:user._id},"secretkey")
            res.cookie("token",token)
            res.status(200).send("Logged in succesfully")  
            } 
            else{
                return res.redirect("/")
            }
            })
    })

app.get('/logout',(req,res)=>{
    res.cookie("token","")
        res.redirect('/login')
        })  

app.listen(3000)
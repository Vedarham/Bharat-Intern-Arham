const express =require('express')
const app=express()
const path=require('path')
const cookieParser=require('cookie-parser')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const userModel=require('./models/user.js')
const postModel=require('./models/post.js')
const upload =require("./utils/multer.js")
// const uploadOnCloudinary =require("./utils/cloudinary.js")
require('dotenv').config()

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/login',(req,res)=>{
    res.render('login')
    })

    app.get('/profile',isLoggedIn,async (req,res)=>{
        let user = await userModel.findOne({email:req.user.email}).populate("posts")
        res.render("profile",{user})
       
    })
    app.get('/Like/:id',isLoggedIn,async (req,res)=>{
        let post = await postModel.findOne({_id: req.params.id}).populate("user")
        
        if(post.postlikes.indexOf(req.user.userid)===-1){
           post.postlikes.push(req.user.userid) 
        }
        else{
            post.postlikes.splice(post.postlikes.indexOf(req.user.userid),1)
        }
        await post.save()
        res.redirect("/profile")
       
    })
    
    app.get('/edit/:id',isLoggedIn,async (req,res)=>{
        let post = await postModel.findOne({_id: req.params.id}).populate("user")
        res.render('edit',{post})
       
    })
    app.get('/delete/:id',isLoggedIn,async(req,res)=>{
        let post = await postModel.findOneAndDelete({_id: req.params.id})
        res.redirect("/profile")
    })
    app.get('/create',isLoggedIn,(req,res)=>{
        res.render('create')
    })
    // app.get('/home',isLoggedIn,async(req,res)=>{
    // let user = await userModel.findOne({email:req.user.email}).populate("posts")
    // res.render('home', { user})
    // })

    app.get('/landing',isLoggedIn,(req,res)=>{
        res.render('landing')
    })
    app.get('/explore',isLoggedIn,async(req,res)=>{
        let posts = await postModel.find().populate("user")
        res.render('explore',{posts})
    })
    // app.get('/profile/update',isLoggedIn,async(req,res)=>{
    //     let user = await userModel.findOne({email:req.user.email})
    //     res.render('profupdate',{user})
    // })

    app.get('/post/:id',isLoggedIn,async(req,res)=>{
       const post = await postModel.findById({_id:req.params.id}).populate("user")
        res.render('post',{post})
    })

app.post('/update/:id',isLoggedIn,async (req,res)=>{
    const {posttitle,postdata} =req.body
        let post= await postModel.findOneAndUpdate({id:req.params._id},
            {posttitle,postdata},{new:true})
        res.redirect('/profile')
    })

app.post('/post',isLoggedIn,upload.single('postpic'),async (req,res)=>{
        try {
            let user = await userModel.findOne({email:req.user.email})
            let {postdata,posttitle,postintro} = req.body
            user.posts.postpic =req.file.filename
            let post = await postModel.create({
                user:user._id,
                postdata,
                posttitle,
                postintro,
            })
            user.posts.push(post._id);
            await user.save()
            res.redirect("/profile")
        } catch (error) {
            res.send(error.message)
        }
       
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
            res.status(200).redirect('/landing')   
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


function isLoggedIn(req,res,next){
    if(req.cookies.token === ""){
        return res.redirect("/")
    }  

try{
    let data = jwt.verify(req.cookies.token,"secretkey")
req.user=data
next()
}catch(err){
        res.redirect("/")
}

    }
app.listen(3000)
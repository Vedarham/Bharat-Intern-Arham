const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/Blogjob`)
const userSchema =mongoose.Schema({
name:String,
username:String,
email:String,
password:String,
age:Number,
bio:{
    type:String,
    default:"Let's Make It Together",
    maxLength:100,
},
profilepic:{
    type:String,
    default:"default.jpg"
},
bannerpic:{
    type:String,
    default:"blog-bg.jpg"
},
posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'post'
}]
})
module.exports = mongoose.model('user',userSchema)
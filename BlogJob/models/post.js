const mongoose = require('mongoose')
const postSchema =mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
},
date:{
    type: Date,
    default: Date.now
},
postintro:{
    type:String,
    maxLength: 70,
},
posttitle:String,
postdata: String,
postpic:{
    type:String,
    default:"BlogJob-logo.png"
},
postlikes:[
    {
        type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    }
]
})
module.exports = mongoose.model('post',postSchema)
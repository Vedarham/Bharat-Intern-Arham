const mongoose = require('mongoose')
// const {marked} = require('marked')
// const slugify = require('slugify')
// const createDomPurify = require('dompurify')
// const { JSDOM } = require('jsdom')
// const dompurify = createDomPurify(new JSDOM().window)
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
// slug:{
//     type:String,
//     unique:true,
//     required:true,
// },
// sanatizedHTML:{
//     type:String,
//     required:true,
// }
})

// postSchema.pre('validate',(next)=>{
//     if(this.posttitle){
//         this.slug = slugify(this.posttitle,{lower:true,strict:true})
//     }
//     if(this.postintro){
//         this.sanatizedHTML=dompurify.sanitize(marked(this.postintro))
//     }
//     next()
// })
module.exports = mongoose.model('post',postSchema)
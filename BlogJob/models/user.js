const mongoose = require('mongoose')
mongoose.connect(`mongodb://127.0.0.1:27017/Blogjob`)

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
    },
    age: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        default: "Let's Make It Together",
        maxLength: 100,
    },
    profilepic: {
        type: String,
        default: "default.jpg"
    },
    bannerpic: {
        type: String,
        default: "blog-bg.jpg"
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)
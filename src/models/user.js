const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type:String,
        enum: ["male", "female","other"],
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode:{
        type:String,
        required:true
    },
    verifyCodeExpiry:{
       type:Date,
       required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    photoURL:{
     type:String,
     default:"https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?t=st=1740420007~exp=1740423607~hmac=b8705a5eabbc3d65928cf6b89e49764a578cc012ff39befc0c0d97e780f86883&w=900"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


userSchema.pre('save' ,async function (next) {

    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        next();
    } catch (error) {
        next(error)
    }
    
});






const User = mongoose.models.User|| mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require('mongoose');
const validator = require('validator')
const passportLocalMongoose = require('passport-local-mongoose')


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        minlength: 8,
    
    },
    confirmpassword: {
        type: String,
        required:true,
        minlength: 8,
    
    },
    confirmed:{
        type:Boolean,
        default:false
    }
})

UserSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model("User", UserSchema); 
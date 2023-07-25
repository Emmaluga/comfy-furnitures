
const mongoose = require('mongoose');

const userModel = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    

}, {timestamps: true

}

)

userModel.methods.fgtpassTok = ()=> {
const tok = crypto.randomBytes(20).toString("hex")

 this.resetPasswordToken = crypto
 .createHash("shake256")
 .update(tok)
 .digest("hex")
 
this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

 return tok

}



module.exports = mongoose.model("Users", userModel);
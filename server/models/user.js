const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true,
    },
    role: {
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    token:{
        type:String,
    }
    
   
})

userSchema.pre('save', async function(next){
    
    const salt=await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function (formPassword){
    return await bcrypt.compare(formPassword, this.password);
}


const User = mongoose.model('User', userSchema)

module.exports = User
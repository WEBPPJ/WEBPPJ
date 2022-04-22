const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const linkSchema = mongoose.Schema({
    link:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        require:true,
        trim:true,
    },
    plan_id: {
        type:String,
        required:true,
        trim:true,
    },
    active:{
        type:Boolean,
        default:false,
    },
    
   
})



const Link = mongoose.model('Link', linkSchema)

module.exports = Link
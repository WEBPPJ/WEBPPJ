const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const syllabusSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        trim:true,
    },
    
   
})



const Syllabus = mongoose.model('Syllabus', syllabusSchema)

module.exports = Syllabus
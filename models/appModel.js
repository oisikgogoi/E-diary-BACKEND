const mongoose = require('mongoose')

const appSchema = mongoose.Schema({
    title : {
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true
    },
    user_id : {
        type:String,
        required:true,
    }
})

module.exports =  mongoose.model('Note',appSchema)
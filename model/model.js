const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique: true
    },
    phone:{
        type:String,
        unique: true
    },
    contract:String
})

const Userdb = mongoose.model('userdb',schema)
module.exports= Userdb;
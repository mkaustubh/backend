const mongoose = require('mongoose');


const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

})

const Admin=mongoose.model('admin',AdminSchema);
module.exports=Admin;
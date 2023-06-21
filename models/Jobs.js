const mongoose=require('mongoose');

const Jobs=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    package:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('jobs',Jobs);
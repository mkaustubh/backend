const mongoose=require('mongoose');

const Notes=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('notes',Notes);

const mongoose=require('mongoose');

const OneShotVideo=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    videoId:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    index:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('oneshotvideo',OneShotVideo);

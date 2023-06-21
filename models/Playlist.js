const mongoose=require('mongoose');

const Playlist=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    playlistId:{
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

module.exports=mongoose.model('playlist',Playlist);
const mongoose=require('mongoose');

const QuestionPaper=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('questionPaper',QuestionPaper);

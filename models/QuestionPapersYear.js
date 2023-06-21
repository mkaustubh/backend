const mongoose=require('mongoose');

const QuestionPaperYear=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('questionPaperYear',QuestionPaperYear);

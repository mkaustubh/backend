const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const QuestionPaperYear =require('../models/QuestionPapersYear');


// this endpoint is for fetching all the notes 

router.get('/fetchQuestionPaperYears',async (req,res)=>{

    try {
        const questionPaperYear = await QuestionPaperYear.find();
        res.send(questionPaperYear);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});

// this endpoint is for adding notes 

router.post('/addQuestionPaperYears',[ 
    body("name","please enter a valid name").isLength({min:3})
],async (req,res)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
    }
    let success=false;

    try {
        const {name}=req.body;
    
        
        let questionPaperYear = await QuestionPaperYear.findOne({ name: req.body.name});
        if (questionPaperYear) {
            return res.status(400).json({success,error:" This year or session already exists"});
        }
    
    
    
        // creating and saving the notes 
    
        questionPaperYear=new QuestionPaperYear({
            name
        })
        const questionPaperYearSaved=await questionPaperYear.save();
        success=true;
        res.json({success,message:`Year \"${questionPaperYear.name}\" has been Added`});
    
       } catch (err) {
          res.status(500).json({success,error:err});
       }
});


// this endpoint is for deleting the notes 

router.delete('/deleteQuestionPaperYears/:id',async (req,res)=>{
    let questionPaperYear=await QuestionPaperYear.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!questionPaperYear){
        return res.status(400).send("Year does not exist");
     }

    success=true;
    //  deleting the note
     questionPaperYear=await QuestionPaperYear.findByIdAndDelete(req.params.id);
     res.json({success,message:`Year \"${questionPaperYear.name}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;

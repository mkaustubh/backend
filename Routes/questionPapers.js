const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const QuestionPaper =require('../models/QuestionPaper');


// this endpoint is for fetching all the notes 

router.get('/fetchQuestionPapers',async (req,res)=>{

    try {
        const questionPaper = await QuestionPaper.find();
        res.send(questionPaper);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});

// this endpoint is for adding notes 

router.post('/addQuestionPapers',[ 
    body("title","please enter a valid title").isLength({min:3}),
    body("url","please enter a valid url").isLength({min:3}),
    body("course","please enter a valid course").isLength({min:3}),
    body("year","please enter a valid year").isLength({min:3})
],async (req,res)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
    }
    let success=false;

    try {
        const {title,url,course,semester,year}=req.body;
    
        
        let questionPaper = await QuestionPaper.findOne({ url: req.body.url});
        if (questionPaper) {
            return res.status(400).json({success,error:"Paper with that url already exists"});
        }
    
    
    
        // creating and saving the notes 
    
        questionPaper=new QuestionPaper({
            title,url,course,semester,year
        })
        const questionPaperSaved=await questionPaper.save();
        success=true;
        res.json({success,message:`Question Paper \"${questionPaper.title}\" has been Added`});
    
       } catch (err) {
          res.status(500).json({success,error:err});
       }
});


// this endpoint is for deleting the notes 

router.delete('/deleteQuestionPaper/:id',async (req,res)=>{
    let questionPaper=await QuestionPaper.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!questionPaper){
        return res.status(400).send("Note does not exist");
     }

    success=true;
    //  deleting the note
     questionPaper=await QuestionPaper.findByIdAndDelete(req.params.id);
     res.json({success,message:`Question Paper \"${questionPaper.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


router.post('/filterQuestionPapers',[
    body("year","please enter a valid year").isLength({min:3}),
    body("semester","please enter a valid semester").isLength({max:2}),
    body("course","please enter a valid course").isLength({min:3})
],async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
    }
    let success=false;

    try{
        const {course,semester,year}=req.body;

        let questionPaper = await QuestionPaper.find({ year: year,semester:semester,course:course});
        if (!questionPaper) {
            return res.status(400).json({success,error:"Question Papers does not exists"});
        }

        success=true;
        res.json({success,questionPaper})
    }catch(error){
        res.status(500).send(error+"Internal Server Error");
    }
    
});

module.exports = router;

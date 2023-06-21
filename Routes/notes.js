const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const Notes =require('../models/Notes');


// this endpoint is for fetching all the notes 

router.get('/fetchNotes',async (req,res)=>{

    try {
        const note = await Notes.find();
        res.send(note);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});

// this endpoint is for adding notes 

router.post('/addNotes',[ 
    body("title","please enter a valid title").isLength({min:3}),
    body("url","please enter a valid author name").isLength({min:3})
],async (req,res)=>{


    const errors=validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
    }
    let success=false;

    try {
        const {title,url}=req.body;
    
        
        let note = await Notes.findOne({ url: req.body.url});
        if (note) {
            return res.status(400).json({success,error:"Note with that url already exists"});
        }
    
    
    
        // creating and saving the notes 
    
        note=new Notes({
            title,url
        })
        const noteSaved=await note.save();
        success=true;
        res.json({success,message:`Note \"${note.title}\" has been Added`});
    
       } catch (err) {
          res.status(500).json({success,error:err});
       }
});


// this endpoint is for deleting the notes 

router.delete('/deleteNotes/:id',async (req,res)=>{
    let note=await Notes.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!note){
        return res.status(400).send("Note does not exist");
     }

    success=true;
    //  deleting the note
     note=await Notes.findByIdAndDelete(req.params.id);
     res.json({success,message:`Note \"${note.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;

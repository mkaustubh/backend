const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const OneShotVideo=require('../models/OneShotVideo');

// ROUTE 1: this endpoint is for fetching all the playlists
router.get('/fetchoneshotvideos',async (req,res)=>{

    try {
        const oneshotvideos = await OneShotVideo.find();
        res.send(oneshotvideos);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});



// ROUTE 2: this endpoint to add any playlist 

router.post('/addoneshotvideos',[
    body("title","please enter a valid title").isLength({min:3}),
    body("author","please enter a valid author name").isLength({min:3}),
    body("videoId","please enter a valid playlist id").isLength({min:3})
],async (req,res)=>{

    const errors=validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
   }
   let success=false;

   try {
    const {title,author,videoId,imageUrl,index}=req.body;

    
    let oneshotvideo = await OneShotVideo.findOne({ videoId: req.body.videoId });
    if (oneshotvideo) {
        return res.status(400).json({success,error:"Video with that video id already exists"});
    }
   

    // creating and saving the playlist 

    oneshotvideo=new OneShotVideo({
        title,author,videoId,imageUrl,index
    })

    const oneshotvideoSaved=await oneshotvideo.save();
    success=true;
    res.json({success,message:`Playlist \"${oneshotvideo.title}\" has been Added`});

   } catch (err) {
      res.status(500).json({success,error:err});
   }
});

// ROUTE : 3 - this endpoint is to delete the playlist 

router.delete('/deleteoneshotvideos/:id',async (req,res)=>{

    let oneshotvideo=await OneShotVideo.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!oneshotvideo){
        return res.status(400).json("Video does not exist");
     }

     success=true;
    //  deleting the playlist
     oneshotvideo=await OneShotVideo.findByIdAndDelete(req.params.id);
     res.json({success,message:`Playlist "${oneshotvideo.title}" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;




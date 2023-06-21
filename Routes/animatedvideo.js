const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const AnimatedVideo=require('../models/AnimatedVideo');

// ROUTE 1: this endpoint is for fetching all the playlists
router.get('/fetchanimatedvideo',async (req,res)=>{

    try {
        const animatedvideo = await AnimatedVideo.find();
        res.send(animatedvideo);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});



// ROUTE 2: this endpoint to add any playlist 

router.post('/addanimatedvideo',[
    body("title","please enter a valid title").isLength({min:3}),
    body("author","please enter a valid author name").isLength({min:3}),
    body("playlistId","please enter a valid playlist id").isLength({min:3})
],async (req,res)=>{

    const errors=validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
   }
   let success=false;

   try {
    const {title,author,playlistId,imageUrl,index}=req.body;

    
    let animatedvideo = await AnimatedVideo.findOne({ playlistId: req.body.playlistId });
    if (animatedvideo) {
        return res.status(400).json({success,error:"Animated videos with that playlist id already exists"});
    }



    // creating and saving the playlist 

    animatedvideo=new AnimatedVideo({
        title,author,playlistId,imageUrl,index
    })
    const animatedvideosaved=await animatedvideo.save();
    success=true;
    res.json({success,message:`Playlist \"${animatedvideo.title}\" has been Added`});

   } catch (err) {
      res.status(500).json({success,error:err});
   }
});

// ROUTE : 3 - this endpoint is to delete the playlist 

router.delete('/deleteanimatedvideo/:id',async (req,res)=>{
    let animatedvideo=await AnimatedVideo.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!animatedvideo){
        return res.status(400).send("Playlist does not exist");
     }

    success=true;
    //  deleting the playlist
     animatedvideo=await AnimatedVideo.findByIdAndDelete(req.params.id);
     res.json({success,message:`Playlist \"${animatedvideo.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;




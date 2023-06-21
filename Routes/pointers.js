const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const Pointers=require('../models/Pointers');

// ROUTE 1: this endpoint is for fetching all the playlists
router.get('/fetchpointersvideo',async (req,res)=>{

    try {
        const pointers = await Pointers.find();
        res.send(pointers);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});



// ROUTE 2: this endpoint to add any playlist 

router.post('/addpointersvideo',[
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

    
    let pointers = await Pointers.findOne({ playlistId: req.body.playlistId });
    if (pointers) {
        return res.status(400).json({success,error:"Playlist with that playlist id already exists"});
    }



    // creating and saving the playlist 

    pointers=new Pointers({
        title,author,playlistId,imageUrl,index
    })
    const pointerssaved=await pointers.save();
    success=true;
    res.json({success,message:`Playlist \"${pointers.title}\" has been Added`});

   } catch (err) {
      res.status(500).json({success,error:err});
   }
});

// ROUTE : 3 - this endpoint is to delete the playlist 

router.delete('/deletepointersvideo/:id',async (req,res)=>{
    let pointers=await Pointers.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!pointers){
        return res.status(400).send("Playlist does not exist");
     }

    success=true;
    //  deleting the playlist
     pointers=await Pointers.findByIdAndDelete(req.params.id);
     res.json({success,message:`Playlist \"${pointers.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;




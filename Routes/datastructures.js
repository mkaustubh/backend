const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const DataStructure=require('../models/DataStructure');

// ROUTE 1: this endpoint is for fetching all the playlists
router.get('/fetchdsvideo',async (req,res)=>{

    try {
        const datastructure = await DataStructure.find();
        res.send(datastructure);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});



// ROUTE 2: this endpoint to add any playlist 

router.post('/adddsvideo',[
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

    
    let datastructure = await DataStructure.findOne({ playlistId: req.body.playlistId });
    if (datastructure) {
        return res.status(400).json({success,error:"Playlist with that playlist id already exists"});
    }



    // creating and saving the playlist 

    datastructure=new DataStructure({
        title,author,playlistId,imageUrl,index
    })
    const datastructuresaved=await datastructure.save();
    success=true;
    res.json({success,message:`Playlist \"${datastructure.title}\" has been Added`});

   } catch (err) {
      res.status(500).json({success,error:err});
   }
});

// ROUTE : 3 - this endpoint is to delete the playlist 

router.delete('/deletedsvideo/:id',async (req,res)=>{
    let datastructure=await DataStructure.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!datastructure){
        return res.status(400).send("Playlist does not exist");
     }

    success=true;
    //  deleting the playlist
     datastructure=await DataStructure.findByIdAndDelete(req.params.id);
     res.json({success,message:`Playlist \"${datastructure.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;




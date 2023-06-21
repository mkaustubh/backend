const express = require('express');
const router=express.Router();
const { body, validationResult } = require("express-validator");
const Jobs=require('../models/Jobs');

// ROUTE 1: this endpoint is for fetching all the playlists
router.get('/fetchjobs',async (req,res)=>{

    try {
        const jobs = await Jobs.find();
        res.send(jobs);
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }

});



// ROUTE 2: this endpoint to add any playlist 

router.post('/addjobs',[
    body("title","please enter a valid title").isLength({min:3}),
    body("company","please enter a valid company name").isLength({min:3}),
    body("position","please enter a valid position id").isLength({min:3}),
    body("package","please enter a valid package id").isLength({min:3}),
    body("course","please enter a valid course id").isLength({min:3}),
    body("batch","please enter a valid batch id").isLength({min:3}),
    body("location","please enter a valid location id").isLength({min:3}),
    body("url","please enter a valid url id").isLength({min:3}),

],async (req,res)=>{

    const errors=validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
   }
   let success=false;

   try {
    const {title,company,position,package,course,batch,location,url}=req.body;

    
    let jobs = await Jobs.findOne({ url: req.body.url });
    if (jobs) {
        return res.status(400).json({success,error:"Job Article with that already exists"});
    }



    // creating and saving the job 

    jobs=new Jobs({
        title,company,position,package,course,batch,location,url
    })
    const jobssaved=await jobs.save();
    success=true;
    res.json({success,message:`Job Article \"${jobs.title}\" has been Added`});

   } catch (err) {
      res.status(500).json({success,error:err});
   }
});

// ROUTE : 3 - this endpoint is to delete the playlist 

router.delete('/deletejobs/:id',async (req,res)=>{
    let jobs=await Jobs.findById(req.params.id);

    let success=false;

    try {
        
    
    // validating that the playlist exists 
     if(!jobs){
        return res.status(400).send("Job article does not exist");
     }

    success=true;
    //  deleting the playlist
     jobs=await Jobs.findByIdAndDelete(req.params.id);
     res.json({success,message:`Job article \"${jobs.title}\" has been deleted`});

    } catch (error) {
         res.status(500).send(error+"Internal Server Error");
    }
})


module.exports = router;




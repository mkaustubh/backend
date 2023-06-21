const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Admin =require('../models/Admin');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_secret = "DSAHELPER";
const fetchAdmin = require('../middleware/fetchAdmin');


// this endpoint is for adding admin 
router.post(
    "/createAdmin",
    [
      body("name", "Please enter a valid name").isLength({ min: 3 }),
      body("email", "Please enter a valid email").isEmail(),
      body("mobile","please enter a valid mobile number").isMobilePhone(),
      body("password", "Password should be atleast 5 characters long").isLength({
        min: 5,
      }),
      body("dateOfBirth","Date of Birth should be Entered")
    ],
    async (req, res) => {
      let success=false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
  
  
      try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
          return res.status(400).json({success,error:"admin with that email already exists"});
        }
        admin = await Admin.findOne({ mobile: req.body.mobile });
        if (admin) {
          return res.status(400).json({success,error:"admin with that mobile number already exists"});
        }
  
  
        //here we are doing the hashing of password
        //salt
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
  
        //here we created a user
        admin = await Admin.create({
          name: req.body.name,
          password: secPassword,
          email: req.body.email,
          mobile:req.body.mobile,
          dateOfBirth:req.body.dateOfBirth
          
        });
  
        //here we creating the data inorder to generate a authToken
        const data = {
          id: {
            id: admin.id,
          },
        };
  
   
  
        //here we are creating the authentication token
        const adminAuthToken = jwt.sign(data, JWT_secret);
        success=true;
        res.json({ success,adminAuthToken });
      } catch (err) {
        res.status(500).json({success,error:err});
      }
    }
  );


//   this endpoint is for admin logging in 

router.post(
    "/admin-login",
    [body("email").isEmail(), body("password").exists()],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
  
      let success=false;
  
      try {
        // desturcturing of email and password from req.body
  
        const { email, password } = req.body;
  
        const admin = await Admin.findOne({ email });
  
        if (!admin) {
          return res
            .status(400)
            .json({success,error:"There is no admin with this Email-id"});
        }
  
        //here we comparing passwords
        const cmpPassword = await bcrypt.compare(password, admin.password);
        if (!cmpPassword) {
          return res.json({success,error:"wrong password"});
        }
  
        const data = {
          id: {
            id: admin.id,
          },
        };
        const secret = "DSAHELPER";
  
        const adminAuthToken = jwt.sign(data, secret);
        success=true;
        res.json({success,adminAuthToken });
      } catch (err) {
        res.status(500).json({success,error:"Internal Server Error"+err});
      }
    }
  );
  

//   this endpoint is for getting admin details 

router.post('/getadmin',fetchAdmin,async (req,res)=>{
    try{
      adminId=req.admin.id;
      const admin=await Admin.findById(adminId).select("-password");
      res.send(admin);
    }
    catch(error){
      res.status(500).send("Internal Server Error");
    }
  });
  

//   this route is for resetting the password of admin 

router.put('/resetadminpassword',async (req,res)=>{
    let success=false;
  
    
    try{
  
      const { email,dateOfBirth,newpassword} = req.body;
      const dob=new Date(dateOfBirth);
  
      const admin = await Admin.findOne({ email });
      
      if(!admin){
        return res.json({success,message:"Admin Does not exist"})
      }
      else if(dob.getTime()!==admin.dateOfBirth.getTime()){
        return res.json({success,message:"Wrong Date of Birth"})
      }
      else{
        
        
        // hashing of new password 
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(newpassword, salt);
        
  
        await Admin.updateOne({_id:admin._id},{$set:{password:secPassword}});
        success=true;
        const temp=await Admin.find({email});
        res.json({success,message:"Password Updated"});
      }
    }
    catch(error){
      res.status(500).send(error+"Internal Server Error");
    }
  
  });
  
  

module.exports = router;

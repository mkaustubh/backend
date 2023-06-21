const jwt = require("jsonwebtoken");
const JWT_secret = "DSAHELPER";


const fetchuser=(req,res,next)=>{

    const token=req.header('adminAuthToken');
    if(!token){
        res.status(401).json({error:"Please authenticate using a valid token"});
    }
    
    try{
        const data=jwt.verify(token,JWT_secret);
        req.admin=data.id;
        next();
    }
    catch(err){
        res.status(401).json({error:"Please authenticate using a valid token"});
    }

   
}

module.exports=fetchuser;
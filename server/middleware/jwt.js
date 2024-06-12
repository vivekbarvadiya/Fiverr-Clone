const jwt=require("jsonwebtoken");
const createError = require("../utils/createErrors");


exports.verifyToken=async(req,res,next)=>{
    try {
        const token=req.cookies.accessToken;
        if (!token) next(createError(401,"You are not authenticated"))

        jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
            if(err){
                return res.status(403).send("token is not valid")
            }
            req.userId=payload.id;
            req.isSeller=payload.isSeller;
        })

        // const payload=await jwt.verify(token,process.env.JWT_KEY);
        // req.userId=payload.id;
        // req.isSeller=payload.isSeller;
        next();
    } catch (error) {
        res.status(403).send("Token is nor valid");
    }
} 
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler( async(req, res, next) =>{
    let tokken;
    if(req?.headers?.authorization?.startsWith("Bearer")){
        tokken = req.headers.authorization.split(" ")[1]
        try{
            if(tokken){

                const decoded = jwt.verify(tokken, process.env.JWT_SECRET)
                const user = await User.findById(decoded?.id)
                req.user = user;
                next(); 
            }
        }catch(err){
            throw new Error("Not Authorized, Token expired. Please login again")
        }
    }else{
        throw new Error("There is no tokken attached to the header")
    }
})

const isAdmin = asyncHandler(async (req, res,next) =>{
    const {email} =req.user;
    const adminUser = await User.findOne({email});

    if(adminUser.role !== "admin"){
        throw new Error("You are not an admin")
    }
    else{
        next();
    }
})

module.exports = { authMiddleware,isAdmin }
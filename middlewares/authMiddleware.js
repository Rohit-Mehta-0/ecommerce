const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const expressAsyncHandler = require("express-async-handler")

const authMiddleware = asyncHandler( async(req, res, next) =>{
    let tokken;
    if(req.headers?.authorization?.startsWith("Bearer")){
        tokken = req.headers.authorization.split(' ')[1]
        try{
            if(token){
                const decoded = jwt.verify(tokken, process.env.JWT_SECRET)
                console.log(decoded)
            }
        }catch(err){
            throw new Error("Not Authorized, Token expired. Please login again")
        }
    }else{
        throw new Error("There is no tokken attached to the header")
    }
})

module.exports = {authMiddleware}
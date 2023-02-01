const { generateToken } = require('../config/jwtTokken');
const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshTokken');

//create a user
const createUser =  asyncHandler(
    async (req, res) =>{

        //check for the user if already exits or not
        const email = req.body.email;
        const findUser = await User.findOne({email: email})
    
        if(!findUser){
            // create a new user
            const newUser = await User.create(req.body);
            res.json(newUser);
        }
        else{
            //user already exists
            throw new Error("User Already Exists")
        }
    }
)

// login user
const loginUserControl  = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    //check for user exists or not
    const findUser = await User.findOne({ email})
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshTokken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(findUser?._id, {
            refreshTokken: refreshTokken
        },
        {
            new:true
        })
        res.cookie('refreshToken', refreshTokken,{
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })
        res.json({
            _id : findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?. mobile,
            tokken: generateToken(findUser._id)
        })
    }
    else{
        throw new Error("Invalid Credentials")
    }
})


//get all user
const getallUser = asyncHandler(async (req, res) =>{
    try{
        const getUsers = await User.find()
        res.json(getUsers); 
    }
    catch(error){
        throw new Error(error)
    }
})



// get a single user

const getaUser = asyncHandler(async (req,res) =>{
    const { id} = req.params
    validateMongodbId(id)
    try{
        const getaUser = await User.findById(id)
        res.json(
            getaUser,
        )
    }catch(error){
        throw new Error(error)
    }
})


// delete a user
const deletetaUser = asyncHandler(async (req,res) =>{
    const { id} = req.params
    validateMongodbId(id);
    try{
        const deleteaUser = await User.findByIdAndDelete(id)
        res.json(
            deleteaUser,
        )
    }catch(error){
        throw new Error(error)
    }
})

// update a user

const updateUser = asyncHandler(async (req, res) =>{
    const {_id} = req.user
    validateMongodbId(_id)
    try{
        const updatedUser = await User.findByIdAndUpdate(_id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email:req?.body?.email,
            mobile:req?.body?.mobile
        },{
            new:true,
        })
        res.json(updatedUser)
    }catch(err){
        throw new Error(err)
    }
})

const blockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId(id)
    try{
        const blockusr = await User.findByIdAndUpdate(id, {
            isBlocked : true,
        },{
            new:true
        }
        )
        res.json(blockusr)
    }
    catch(error){
        throw new Error(error)
    }
})
const unblockUser = asyncHandler(async (req, res)=>{
    const {id} = req.params;
    validateMongodbId();
    try{
        const unblockusr = await User.findByIdAndUpdate(id, {
            isBlocked : false,
        },{
            new:true
        }
        )
        res.json(unblockUser)
    }
    catch(error){
        throw new Error(error)
    }
})

module.exports = { createUser, loginUserControl , getallUser, getaUser, deletetaUser, updateUser, blockUser,unblockUser};
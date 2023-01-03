const User=require('../models/userModel');
const asyncHandler=require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbId = require('../utils/validateMongodbId');

// Create a user
const createUser=asyncHandler(
    async(req,res)=>{
        const email=req.body.email;
        const findUser=await User.findOne({email:email});
        if(!findUser){
            // Create new user
            const newUser=await User.create(req.body);
            res.json(newUser);
    
        }else{
            // User already Exist
          throw new Error('User Already Exist');
        }
    });

// Login a user
    const loginUserCtrl=asyncHandler(async(req,res)=>{
        const {email,password}=req.body;
        // check if user exist or not
        const findUser=await User.findOne({email});
        if(findUser && await findUser.isPasswordMatched(password)){
            res.json({
                _id:findUser?._id,
                firstname:findUser?.firstname,
                lastname:findUser?.lastname,
                email:findUser?.email,
                mobile:findUser?.mobile,
                token:generateToken(findUser?._id)
            });

        }else{
            throw new Error("Invalid Credentials")
        }
    })
    

    // Get all the Users

    const getallUser= asyncHandler(async(req,res)=>{
        try{
            const getUsers= await User.find()
            res.json(getUsers)
        }
        catch(error){
            throw new Error(error)
        }
    })

  

    // Update a user
    const updatedUser= asyncHandler(async(req,res)=>{
        const {id}= req.user;
        validateMongoDbId(id);
        try{
            const updatedUser=await User.findByIdAndUpdate(id,{
                firstname:req?.body.firstname,
                lastname:req?.body.lastname,
                email:req?.body.email,
                mobile:req?.body.mobile
            },{
                new:true,
            });
            res.json(updatedUser)
        }catch(error){
            throw new Error(error)
        }
    })



     // Delete single User 

     const deleteaUser= asyncHandler(async(req,res)=>{
        const {id}=req.params;
        validateMongoDbId(_id);
        try{
          const deleteaUser=await User.findByIdAndDelete(id)
          res.json({
              deleteaUser,
          })
        }catch(error){
              throw new Error(error)
        }
      })

        // Get single User 

    const getaUser= asyncHandler(async(req,res)=>{
      const {id}=req.params;
      validateMongoDbId(id);
      try{
        const getaUser=await User.findById(id)
        res.json({
            getaUser,
        })
      }catch(error){
            throw new Error(error)
      }
    })


    const blockUser=asyncHandler(async(req,res)=>{
      const {id}=req.params;
      validateMongoDbId(id);
      try{
        const block=await User.findByIdAndUpdate(id,{
          isBlocked:true
        },{
          new:true,
        });
        res.json({
          message:"User Blocked"
        });

      }catch(error){
        throw new Error(error);
      }
    })

    const unblockUser=asyncHandler(async(req,res)=>{
      const {id}=req.params;
      validateMongoDbId(id);
      try{
        const unblock=await User.findByIdAndUpdate(id,{
          isBlocked:false,
        },{
          new:false,
        });
        res.json({
          message:"User UnBlocked"
        });

      }catch(error){
        throw new Error(error);
      }
    })



module.exports={
  createUser,
  loginUserCtrl,
  getallUser,getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser

};
const Users=require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


const registerUser=  async(req, res) => {
    try{
        //Step 1: Check if user already exists
        const data= await Users.findOne({phoneNumber:req.body.phoneNumber })
        if(data){
            res.status(409).json({
                msg: "Phone Number already exists",
                success: false,
                
            })
        }else{
                //Step 2: Create a hash password of req.body.password
                req.body.password = await bcrypt.hash(req.body.password, saltRounds)
                //Step 3: Generating Tokens jwt token generator
                const token = jwt.sign({ phoneNumber:req.body.phoneNumber }, process.env.SECRET_KEY);
                const data=await Users.create(req.body)
                if (data){
                    const {password,...otherFields}=data._doc
                res.json({
                    msg: "you are successfully registered",
                    success: true,
                    token,
                    userDetails:otherFields
                })
        }
    }
      
    }catch(err){
        console.log(err)
    }
  
}

const loginUser=  async(req, res) => {
    try{
      const data = await Users.findOne({phoneNumber: req.body.phoneNumber}) 
      if(data){
        const isMatched = await bcrypt.compare(req.body.password, data.password)
        if(isMatched){
            const token = jwt.sign({ phoneNumber:req.body.phoneNumber}, process.env.SECRET_KEY);
            res.json({
                token:token,
                success: true,
                userDetails: data
            })
        }else{
            res.json({
                success: false,
                msg: "Password didn't matched"
            })
        }
      }else{
        res.json({
            success: false,
            msg: "Phone Number doesn't exist"
        })
      }
    }catch(err){
        console.log(err)
    }
  
}
//Password change controller
const changePassword =  async(req, res) => {
    try{
         // dbData= Users.findById(req.params.id)
        const dbData=await Users.findById(req.params.id)

        if(dbData){
            //1. req.body.currentPassword and dbData.password
            //bcrypt.compare(req.body.password, data.password)
            const isMatched= await bcrypt.compare(req.body.currentPassword, dbData.password)
            if(isMatched){
                 //if true, update database=> 
                 //findByIdandUpdate(req.params.id, {password: req.body.newPassword})
                req.body.newPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
                await Users.findByIdAndUpdate(req.params.id,{password: req.body.newPassword})
                res.json({
                    msg:"Password Changed Successfully",
                    changePass:true
                })
            }else{
                res.json({
                    changePasssuccess: false,
                    msg: "Current Password doesn't matched"
                })
            }
        }
    }catch(err){
        console.log(err)
    }
}


    const changeUserDetails = async (req, res) => {
        try {
            //to check the current details of user
            await Users.findByIdAndUpdate(req.params.id,{ $set: req.body })
            const data = await Users.findById(req.params.id)
            if (data) {
                res.json({
                    msg: "Details changed successfully",
                    success: true,
                    userDetails: data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
   

module.exports = {registerUser,loginUser,changePassword,changeUserDetails}
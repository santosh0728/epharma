const Users=require('../models/users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



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

module.exports = {registerUser}
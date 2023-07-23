const Users=require('../models/users')

const checkIfUserExists=async(req,res)=>{
    const data=await Users.findOne({phoneNumber:req.params.phoneNumber})
    if(data){
        res.json({
            msg:"Phone number already exists",
            validPhoneNumber:false
        })
    }else{
        res.json({
            validPhoneNumber:true
        })
    }
}

const registerUser=async(req, res) => {
    await Users.create(req.body)
    res.json({
      msg: "you are successfully registered"
    })
  }

module.exports={checkIfUserExists,registerUser}
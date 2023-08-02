const express=require('express')
const UsersController=require('../controller/users')
const router=express.Router()


router.post('/signup',UsersController.registerUser )
router.post('/login',UsersController.loginUser )
  


module.exports=router;
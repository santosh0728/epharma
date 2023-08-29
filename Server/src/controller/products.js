const fs = require('fs');
const path = require('path');
const Products=require('../models/products')


const addNewProducts = async(req,res)=>{
    req.body.productImage = req.file.filename
    await Products.create(req.body)
      res.json({
        msg: 'success'
      })
  }



const getAllProducts = async(req,res)=>{
   const data =  await Products.find()
   if(data){
    res.json({
      data,
      msg: 'success'
    })
   }  

  }

  const getProductImageById = async(req,res)=> {
    const data =  await Products.findById(req.params.id)
    const imageDir = path.join(__dirname,'../../','uploads/'+data.productImage) 
    const defaultDir = path.join(__dirname,'../../','uploads/userAvatar/nobike.jpeg') 

    if(fs.existsSync( imageDir )){
        res.sendFile(imageDir)
    }else{
        res.sendFile(defaultDir)
    }
   
  }

 const getProductById=async(req,res)=>{
 const product = await Products.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product not found'
    })
  }

  res.status(200).json({
    success: true,
    product,
  })

 }
  module.exports = {addNewProducts,getAllProducts,getProductImageById,getProductById}
const express=require('express')
const router=express.Router()
const ProductsController=require('../controller/products')



router.post("/products",ProductsController.addNewProducts)
router.get('/products',ProductsController.getAllProducts)

module.exports=router;
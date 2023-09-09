const express=require('express')
const router=express.Router()
const ProductsController=require('../controller/products')

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Math.floor(Math.random() *10000000)+ file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/product-img/:id', ProductsController.getProductImageById)
router.post("/products", upload.single('product'), ProductsController.addNewProducts)
router.get('/products/:id',ProductsController.getProductById)
router.get('/products',ProductsController.getAllProducts)
router.get('/products-by-category/:category',ProductsController.getProductsByCategory)

module.exports=router;



const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    productName: String, // String is shorthand for {type: String}
    productPrice: Number,
    category: String,
    productDescription: String,
    productImage: String,
    quantity:Number
  });
  
  const Products = mongoose.model('Products', productSchema);
  module.exports = Products

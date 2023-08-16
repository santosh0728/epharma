const mongoose=require('mongoose')
// const { Schema } = mongoose;
// mongoose.connect('mongodb://localhost:27017/epharma');



const userSchema = new mongoose.Schema({
    fullname: {type:String,required:true},
    phoneNumber: {type:String,required:true}, // String is shorthand for {type: String}
    email: String,
    password: String,
    address:String,
    wishList:Array
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users
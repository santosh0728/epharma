const mongoose=require('mongoose')
// const { Schema } = mongoose;
// mongoose.connect('mongodb://localhost:27017/epharma');



const userSchema = new mongoose.Schema({
    fullname: String, // String is shorthand for {type: String}
    email: String,
    password: String,
    phoneNumber: String,
    address:String
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users
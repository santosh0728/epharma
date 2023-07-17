const mongoose=require('mongoose')
const { Schema } = mongoose;
// mongoose.connect('mongodb://localhost:27017/epharma');



const userSchema = new Schema({
    fullName: String, // String is shorthand for {type: String}
    phoneNumber: Number,
    email: String,
    password: String,
    mode: String,
    vehicleDetails: Object
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username :{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  role: {
  type: String,
  enum: ['user', 'admin'], // Or add more roles if needed
  default: 'user'
},
  password:{
    type:String,
    required:true,
  }
},
  {timestamps:true})

module.exports = mongoose.model("User",UserSchema)
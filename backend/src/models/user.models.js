const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   firstName: String,
   lastName: String,
   password: String,
})

export const User = mongoose.model('User', userSchema);
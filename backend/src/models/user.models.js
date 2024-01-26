import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   firstName: String,
   lastName: String,
   password: String,
})

userSchema.pre("save", async function(next) {
   console.log("saving password")
   this.password = await bcrypt.hash(this.password, 10);
   next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema);
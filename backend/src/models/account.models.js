import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId(),
      ref: 'User',
      required: [true, "User id is required to get balance"]
   },
   balance: {
      type: Number,
      required: true
   }
})

export const Account = mongoose.model('Account', accountSchema);
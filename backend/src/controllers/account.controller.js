import mongoose from "mongoose";
import { Account } from "../models/account.models.js"
import { transferMoneySchema } from "../types.js";
import { User } from "../models/user.models.js";

export const getBalance = async function (req, res) {
   const userId = req.user._id
   const userBalance = await Account.findOne({userId});
   
   res.status(200).json({
      success: true,
      balance: userBalance.balance
   })
}

export const transferMoney = async function (req, res) {
   const session = await mongoose.startSession()
   session.startTransaction();
   const transferDetail = transferMoneySchema.safeParse(req.body);
   console.log(transferDetail)
   if(!transferDetail.success){
      return res.status(400).json({
         success: false,
         message: "Invalid credentials"
      })
   }

   const account = await Account.findOne({ userId: req.user._id }).session(session);

   if(!account || account.balance < transferDetail.data.amount){
      await session.abortTransaction()
      return res.status(200).json({
         success: false,
         message: "Insufficient balance"
      })
   }
   const reciever = await Account.findOne({userId: transferDetail.data.to}).select("-password").session(session)
   console.log(reciever)
   if(!reciever){
      await session.abortTransaction()
      return res.status(400).json({
         success: false,
         message: "User does not exists"
      })
   }
   // const toAccount = await Account.findOne({userId: reciever._id}).session(session)
   // console.log(account._id, reciever._id, reciever.userId)
   if(account._id.toString() === reciever._id.toString()){
      await session.abortTransaction()
      return res.status(400).json({
         success: false,
         message: "You cannot send money to your own account"
      })
   }
   // perform transaction
   await Account.updateOne({userId: req.user._id}, {$inc: {balance: -transferDetail.data.amount}}).session(session)
   await Account.updateOne({userId: reciever._id}, {$inc: {balance: transferDetail.data.amount}}).session(session)

   await session.commitTransaction();

   res.status(200).json({
      success: true,
      message: "Transfer successfull"
   })
   
}
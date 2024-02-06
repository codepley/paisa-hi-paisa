import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';

export const verifyUser = async function(req, res, next) {
   try {
      const token = req.cookies?.token || req.header("Authorization").replace("Bearer ", "");

      // console.log(token)
      if(!token) {
         return res.status(401).json({
            success: false,
            message: "Unauthorized request"
         })
      }
   
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // console.log(decodedToken)
      
      const user = await User.findById(decodedToken.userId).select('-password');
      if(!user){
         // console.log("user not present")
         return res.status(401, "Token expired or invalid").json({
            success: false,
            message: "Token expired or invalid"
         })
      }
      req.user = user;
      next()
   } catch (error) {
      res.status(400).json({
         success: false,
         message: "Invalid Token hai"
      })
   }
}
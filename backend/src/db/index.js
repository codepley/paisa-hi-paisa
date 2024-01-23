import mongoose from "mongoose";

const connectDB = async function () {
   try {
      const connectionInstance = await mongoose.connect(process.env.MONGO_URL);
      console.log("MONGODB Connected...")
   } catch(error) {
      console.log("Mongo Error", error)
      process.exit(1)
   }
}

export default connectDB;
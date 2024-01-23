import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error hora")
      console.log("Error", error);
      // throw error;
    });
    app.listen(3000, () => {
      console.log("Connected to port 3000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed", error);
  });

import { Account } from "../models/account.models.js";
import { User } from "../models/user.models.js";
import { updateUserSchema, userSchema } from "../types.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  const userRecievedData = req.body.data;
  console.log(userRecievedData)
  const parsed = userSchema.safeParse(userRecievedData);
  if (!parsed) {
    return res.status(400).json({
      success: "false",
      message: "Invalid Inputs",
    });
  }

  const userExist = await User.findOne({ email: userRecievedData.email });

  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "User already registered, please sign in",
    });
  }

  const user = await User.create(userRecievedData);

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  const accountInfo = await Account.create({
   userId,
   balance: 1 + Math.random()*10000
  })

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    user,
    token,
  });
};

export const userSignin = async (req, res) => {
  const userData = req.body.data;
  const parsedEmail = userSchema.shape.email.safeParse(userData.email);
  const parsedPassword = userSchema.shape.password.safeParse(userData.password);

  if (!parsedEmail.success || !parsedPassword.success) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email: userData.email });
  if (!userExists) {
    return res.status(400).json({
      success: false,
      message: "Wrong Email or Password",
    });
  }

  // check password
  const validPassword = await userExists.isPasswordCorrect(userData.password);
  if (!validPassword) {
    return res.status(400).json({
      success: false,
      message: "Username or password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
    },
    process.env.ACCESS_TOKEN_SECRET
  );

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    token,
    userExists,
  });
};

export const updateUser = async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      success: false,
      message: "Error while updating information",
    });
  }

  await User.findByIdAndUpdate(req.user._id, req.body);

  res.status(200).json({
    success: true,
    message: "Updated successfully",
  });
};

export const getUser = async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  
  res.status(200).json({
   success: true,
   message: "User fetch successfully",
   users
  })
};

export const getLoggedInUser = async (req, res) => {
  res.status(200).json({
    success: true, 
    user: req.user
  })
}

export const userBalance = async (req, res) => {
  res.json({ balance: "10000", user: req.user });
};

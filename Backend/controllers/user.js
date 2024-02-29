import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";
import Expense from "../models/Expense.js";

dotenv.config();

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  if (!User.findOne({ email })) {
    res
      .status(403)
      .json({ message: `User with email: ${email} does not exists` });
  }

  const user = await User.findOne({ email });
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ success: true, accessToken });
  } else {
    res.status(200).json({success: false, message:"Email or password is not valid"});
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Business logic - registration
  const { firstName, lastName, email, password } = req.body;

  if ((await User.findOne({ email })) !== null) {
    res.status(200).json({ result: 0, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({ result: 1, user: newUser});
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

const deleteAccount = asyncHandler(async (req, res) => {

  const _id = req.user.id;

  if ((await User.find({ _id })) === null) {
    res.status(400).json({message: "There exists an problem"})
  }

  //Removing an expense if usere delets its accout
  if ((await Expense.find({createdBy: _id})) !== null) {
    await Expense.deleteMany({createdBy: _id});
  }

  if ((await Expense.find({author: _id})) !== null) {
    await Expense.deleteMany({author: _id});
  }

  await User.deleteOne({ _id});
  res.status(200).json({ message: "Account successfully deleted" });
});

const emailExists = asyncHandler(async (req,res) => {

  const {email} = req.body;

  if (email === "" || email === null) {
    res.status(400).json({message: "Empty body"});
  } else {
    if ((await User.findOne({ email })) === null) {
      res.status(200).json( {email: email, exists: false});
    }
    
    if ((await User.findOne({email})) !== null) {
      res.status(200).json({email: email, exists: true});
    }
  }
})

export default { loginUser, currentUser, registerUser, deleteAccount, emailExists };

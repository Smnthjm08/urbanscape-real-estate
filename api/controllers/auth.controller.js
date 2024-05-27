import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
// import { dotenv } from "dotenv";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (
      err.code === "P2002" &&
      err.meta &&
      err.meta.target === "User_email_key"
    ) {
      // Unique constraint failed on the email field
      res.status(409).json({ message: "Email already in use!" });
    } else {
      console.log(err);
      res.status(500).json({ message: "Failed to create user!" });
    }
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials!" });
    }

    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid Credentials!" });
    }

    //GENERATE COOKIE TOKEN AND SEND TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );
    const { password: userPassword, ...userInfo } = user;

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

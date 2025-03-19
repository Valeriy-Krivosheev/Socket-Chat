import express from "express";
import jwt from "jsonwebtoken";

import {
  createUser,
  comparePassword,
  findUserByName,
} from "../../models/user.js";
const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByName(username);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging user", err });
  }
});

export default router;

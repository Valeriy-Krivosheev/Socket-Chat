import express from "express";
import jwt from "jsonwebtoken";

import {
  createUser,
  comparePassword,
  findUserByName,
} from "../../src/models/user.js";
import checkForToken from "../../src/middleware/auth.js";
const router = express.Router();

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
    const token = jwt.sign(
      { userId: user._id.toLocaleString() },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10h",
      },
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Error logging user", err });
  }
});

router.get("/me", checkForToken, async (req, res) => {
  try {
    const user = await findUserByName(req.user.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error logging user", err });
  }
});

export default router;

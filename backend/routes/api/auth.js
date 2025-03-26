import express from "express";
import jwt from "jsonwebtoken";
import {
  createUser,
  comparePassword,
  findUserByName,
  findUserById,
} from "../../src/models/user.js";
import { authMiddleware } from "../../src/middleware/auth.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password, timeEntering } = req.body;
    console.log(req.body);
    const user = await createUser(username, password, timeEntering);
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

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error logging user", err });
  }
});

export default router;

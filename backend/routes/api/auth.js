import express from "express";
import generateTokens from "../../src/base/tokenGenerate.js";
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
    const { accessToken, refreshToken } = generateTokens(
      user._id.toLocaleString(),
    );
    res.json({ accessToken, refreshToken });
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
// router.post("/logout", authMiddleware, async (req, res) => {
//   try {
//     await deleteRefreshToken(req.body.refreshToken);
//     res.json({ message: "Logged out successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error logging out", err });
//   }
// });

// router.post("/refresh", async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       return res.status(401).json({ message: "Refresh token not found" });
//     }
//
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
//     const user = await findUserByToken(decoded.userId, refreshToken);
//     if (!user) {
//       return res.status(403).json({ message: "Invalid refresh token" });
//     }
//     const { accessToken, refreshToken: newRefreshToken } = generateTokens(
//       user._id.toLocaleString(),
//     );
//
//     await deleteRefreshToken(refreshToken);
//     await saveRefreshToken(newRefreshToken);
//     res.json({ accessToken, refreshToken: newRefreshToken });
//   } catch (err) {
//     res.status(500).json({ message: "Error logging user", err });
//   }
// });

export default router;

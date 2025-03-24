import express from "express";
import dbConnent from "../../src/base/index.js";
import checkForToken from "../../src/middleware/auth.js";

const router = express.Router();
router.get("/", checkForToken, async (req, res) => {
  const messages = await dbConnent(
    process.env.MONGO_DB_USERS,
    "V-Chat",
    "messages",
  );
  res.send(await messages.find({}).toArray());
});

router.post("/", checkForToken, async (req, res) => {
  const messages = await dbConnent(
    process.env.MONGO_DB_USERS,
    "V-Chat",
    "messages",
  );
  await messages.insertOne({
    user: req.body.user,
    content: req.body.content,
    type: req.body.type,
  });
  res.status(201).send();
});

export default router;

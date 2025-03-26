import dbConnent from "../base/index.js";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export const createUser = async (username, password, timeEntering) => {
  const users = await dbConnent(
    process.env.MONGO_DB_AUTH,
    "vChat-auth",
    "users",
  );
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword, timeEntering };
  await users.insertOne(user);
  return user;
};

export const findUserByName = async (username) => {
  const users = await dbConnent(
    process.env.MONGO_DB_AUTH,
    "vChat-auth",
    "users",
  );
  return await users.findOne({ username });
};
export const findUserById = async (userId) => {
  const users = await dbConnent(
    process.env.MONGO_DB_AUTH,
    "vChat-auth",
    "users",
  );
  return await users.findOne({ _id: new ObjectId(userId) });
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

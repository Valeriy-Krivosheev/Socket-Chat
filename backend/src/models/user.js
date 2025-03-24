import dbConnent from "../base/index.js";
import bcrypt from "bcryptjs";

export const createUser = async (username, password) => {
  const users = await dbConnent(
    process.env.MONGO_DB_AUTH,
    "vChat-auth",
    "users",
  );
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  await users.insertOne(user);
  return user;
};

export const findUserByName = async (username) => {
  const users = await dbConnent(
    process.env.MONGO_DB_AUTH,
    "vChat-auth",
    "users",
  );
  return users.findOne({ username });
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

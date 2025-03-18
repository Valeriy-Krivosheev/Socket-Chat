import {dbConnent} from "../base";

const {MongoClient} = require('mongodb');
const bcrypt = require('bcryptjs')

const authUri = process.env.MONGO_DB_AUTH

const createUser = async (username, password) => {
const users = await dbConnent(authUri,'vChat-auth','users')
}
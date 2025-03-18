import dbConnent from 'backend/base'
import {MongoClient} from 'mongodb'
import bcrypt from 'bcryptjs'

const authUri = process.env.MONGO_DB_AUTH

const createUser = async (username, password) => {
const users = await dbConnent(authUri,'vChat-auth','users')
}
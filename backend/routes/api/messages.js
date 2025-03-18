require('dotenv').config();
const express = require('express');
import {dbConnent} from "../base";

const router = express.Router();
const usersUri = process.env.MONGO_DB_USERS;

router.get('/', async (req, res) => {
    const messages = await dbConnent(usersUri,'V-Chat','messages')
    res.send(await messages.find({}).toArray())
})


router.post('/', async (req, res) => {
    const messages = await dbConnent(usersUri,'V-Chat','messages')
    await messages.insertOne({
        user: req.body.user,
        content: req.body.content,
        type: req.body.type,
    })
    res.status(201).send()
})



module.exports = router;
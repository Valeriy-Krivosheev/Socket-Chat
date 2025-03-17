require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await loadMessages()
    res.send(await messages.find({}).toArray())
})


router.post('/', async (req, res) => {
    const messages = await loadMessages()
    await messages.insertOne({
        user: req.body.user,
        content: req.body.content,
        type: req.body.type,
    })
    res.status(201).send()
})

async function loadMessages() {
    try{
        console.log('Попытка подключения к MongoDB...');
        const client = await mongodb.MongoClient.connect(process.env.MONGO_DB_URL);
        console.log('Успешное подключение к MongoDB');
        return client.db('V-Chat').collection('messages')
    }
    catch(err){
        console.error('Ошибка подключения к MongoDB:', err);
        throw err;
    }

}


module.exports = router;
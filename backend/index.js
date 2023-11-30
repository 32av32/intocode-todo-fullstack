const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use(require('./routes/todos.route'))

async function connectToMongoose(url) {
    try{
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Успешно соединились с сервером MongoDB')
    } catch (err) {
        console.log(`Ошибка при соединении с сервером MongoDB. Message: ${err.message}`)
    }

}

connectToMongoose('mongodb+srv://32av32:32av32@cluster0.7fiabdg.mongodb.net/todo?retryWrites=true&w=majority')
app.listen(4000)
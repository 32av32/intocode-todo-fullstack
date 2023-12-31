const mongoose = require('mongoose')
const Schema = mongoose.Schema
const TodoSchema = new Schema({
    text: {
        type: String,
        require: true
    },
    is_favorite: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model('Todo', TodoSchema)
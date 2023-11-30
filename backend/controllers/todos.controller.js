const Todo = require('../models/Todo.model')


module.exports.todosController = {
    getTodo: async function(req, res) {
        try {
            const todo = await Todo.findById(req.params.id)
            res.json(todo)
        } catch (err) {
            res.json({"error": "Не удалось получить запись"})
        }
    },
    getTodos: async function(req, res) {
        try {
            const todos = await Todo.find()
            res.json(todos)
        } catch (err) {
            res.json({"error": "Не удалось получить записи"})
        }
    },
    postTodo: async function(req, res) {
        try {
            const { text } = req.body
            await Todo.create({ text })
            const newTodo = await Todo.findOne({ text })
            res.json(newTodo)
        } catch (err) {
            res.json({"error": "Ошибка при добавлении записи"})
        }
    },
    deleteTodo: async function(req, res) {
        try {
            await Todo.findByIdAndDelete(req.params.id)
            res.json('Record has been deleted')
        } catch (err) {
            res.json({"error": "Ошибка при удалении записи"})
        }
    },
    patchTodo: async function(req, res) {
        try {
            await Todo.findByIdAndUpdate(req.params.id, { ...req.body })
            const changedTodo = await Todo.findById(req.params.id)
            res.json(changedTodo)
        } catch (err) {
            res.json({"error": "Ошибка при изменении записи"})
        }
    }
}
const { Router } = require('express')
const cors = require('cors')
const { todosController } = require('../controllers/todos.controller')
const router = Router()


router.get('/todos', todosController.getTodos)
router.get('/todos/:id', todosController.getTodo)
router.post('/todos', todosController.postTodo)
router.delete('/todos/:id', todosController.deleteTodo)
router.patch('/todos/:id', todosController.patchTodo)

module.exports = router;
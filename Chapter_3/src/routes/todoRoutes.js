import express from "express";
import db from "../db.js"

const router = express.Router()

//get todos for logged in user
router.get('/', (req, res) => {
    try {
        const userId = req.userId // from auth middleware
        const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
        const todos = getTodos.all(userId)
        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to fetch todos" })
    }
})

//create new todo
router.post('/', (req, res) => {
    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos(task, user_id) VALUES(?, ?)`)
    const result = insertTodo.run(task, req.userId)
    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

//update todo
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params
    const { page } = req.query

    const updateTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`)
    updateTodo.run(completed, id)

    res.json({ id, completed, page })
})

//delete todo
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? and user_id = ?`)
    deleteTodo.run(id, userId)
    res.json({ message: "Todo deleted successfully" })
})

export default router
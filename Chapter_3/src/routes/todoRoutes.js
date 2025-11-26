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

})

//update todo
router.put('/:id', (req, res) => {

})

//delete todo
router.delete('/:id', (req, res) => {

})

export default router
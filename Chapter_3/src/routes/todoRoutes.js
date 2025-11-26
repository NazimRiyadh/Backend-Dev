import express from "express";
import db from "../db.js"

const router = express.Router()

//get todos for logged in user
router.get('/', (req, res) => {

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
import express from "express";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router = express.Router()


//Register a new user for auth/register endpoint
router.post("/register", (req, res) => {
    const { username, password } = req.body

    //save the username and hashed password to the database
    const hashedPassword = bcrypt.hashSync(password, 8)

    //check if a user already exists
    const getUser = db.prepare(`Select * from users where username = ?`)
    const user = getUser.get(username)
    if (user) {
        return res.status(409).json({ message: "User already exists" })
    }

    //insert the user into the database
    try {
        const insertUser = db.prepare(`Insert into users(username, password) values(?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        //create a default todo for a new user
        const defaultTodo = "Welcome to first todo"
        const insertTodo = db.prepare(`Insert into todos(user_id, task) values(?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        //create a token for the new user
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: "24h" })
        res.json({ token })

    } catch (error) {
        console.log(error)
    }

})

//Login a user for auth/login endpoint
router.post("/login", (req, res) => {
    //when we login ,we look the password we compare the encrypted 
    //password with the one we get from the request

    const { username, password } = req.body
    try {
        const getUser = db.prepare(`Select * from users where username = ?`)
        const user = getUser.get(username)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" })
        res.json({ token })
    } catch (error) {
        console.log(error)
        res.status(503).json({ message: "Internal Server error" })
    }


})

export default router
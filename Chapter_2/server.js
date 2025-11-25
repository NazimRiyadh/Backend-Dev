//URL: http://localhost:8383
const express = require("express")
const app = express()

const port = 8383

let data = {
    users: [
        {
            name: "Riyadh",
            age: 22,
            city: "Dhaka"
        }
    ]
}

//Middleware
app.use(express.json())

console.log("Welcome to server!")


//Website endpoints
app.get('/', (req, res) => {
    console.log("I have hit the dasboard endpoint!", req.method)
    res.send(
        `
        <body style="background-color: black; color: white; text-align: center">
            <p>${JSON.stringify(data)}</p>
        </body>
        `
    )
})

app.get('/dashboard', (req, res) => {
    console.log("I have hit the dasboard endpoint!", req.method)
    res.send("<h1>Welcome to dashboard!</h1>")
})

//API endpoints
app.get('/api/data', (req, res) => {
    console.log("this one was for data")
    res.send(data)
})

//CRUD - Method
//Create-post
//Read-get
//Update-put
//Delete-delete

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    data.users.push(newEntry)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.users.pop()
    res.sendStatus(204)
})


app.listen(port, () => console.log(`Server running on port ${port}`))


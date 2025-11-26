/*
dotenv/config → loads environment variables.
express → creates HTTP server & routes.
path + fileURLToPath → handles file paths in ES modules.
express.json() → parses JSON request bodies.
express.static() → serves static files (HTML/CSS/JS).
app.get() → defines a route to serve the homepage.
app.listen() → starts the server 
*/

import 'dotenv/config'; // <-- loads .env
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"

const app = express();
const PORT = process.env.PORT || 5003

//Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);

//Get the directory name from the file path
const __dirname = dirname(__filename);


//Middleware

//Middleware for parsing JSON
app.use(express.json());

//serves the html file from the public directory and also tells express from the public folder as static file/assest.
//any requests for the css will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../public')));

//Endpoint from serving html from public directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


//Routes          
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

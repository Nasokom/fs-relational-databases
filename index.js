const express = require('express')
const app = express()

const { PORT} = require('./utils/config')
const {syncModels} = require('./Models/index')
const {connectToDatabase} = require('./utils/db')

const blogsController = require('./Controllers/Blog')
const usersController = require('./Controllers/user')
const ErrorCatcher = require('./Middleware/ErrorCatcher')

app.use(express.json())

app.use('/api/blogs',blogsController)
app.use('/api/users',usersController)

app.use(ErrorCatcher)
const start = async ()=>{
    await connectToDatabase();
    await syncModels();
    app.listen(PORT, ()=>{
        console.log('server running on port', PORT)
    })
}

start()
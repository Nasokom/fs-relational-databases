const express = require('express')
const app = express()

const { PORT} = require('./utils/config')
const {syncModels} = require('./Models/index')
const {connectToDatabase} = require('./utils/db')

const blogsController = require('./Controllers/Blog')
const usersController = require('./Controllers/user')
const loginController = require('./Controllers/login')
const authorsController = require('./Controllers/author')
const testController = require('./Controllers/tests')
const ErrorCatcher = require('./Middleware/ErrorCatcher')

app.use(express.json())

app.use('/api/blogs',blogsController)
app.use('/api/users',usersController)
app.use('/api/login', loginController)
app.use('/api/authors', authorsController)
//For testing purpose
app.use('/',testController)

app.use(ErrorCatcher)

const start = async ()=>{
    await connectToDatabase();
    await syncModels()
    app.listen(PORT, ()=>{
        console.log('server running on port', PORT)
    })
}

start()
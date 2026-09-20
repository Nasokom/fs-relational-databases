const express = require('express')
const app = express()

const { PORT} = require('./utils/config')

const {connectToDatabase} = require('./utils/db')

const blogsController = require('./Controllers/Blog')
const ErrorCatcher = require('./Middleware/ErrorCatcher')

app.use(express.json())

app.use('/api/blogs',blogsController)

app.use(ErrorCatcher)
const start = async ()=>{
    await connectToDatabase()
    app.listen(PORT, ()=>{
        console.log('server running on port', PORT)
    })
}

start()
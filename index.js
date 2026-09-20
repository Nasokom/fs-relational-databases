require('dotenv').config()
const express = require('express')
const {sequelize} = require('./utils.js')
const app = express()
const Blog = require('./Models/Blog.js')
const blogsController = require('./Controllers/Blog')

app.use(express.json())
app.use('/api/blogs',blogsController)

const PORT = process.env.PORT || 3003 
app.listen(PORT, async ()=>{
    await Blog.sync()
    console.log('server running on port', PORT)
})
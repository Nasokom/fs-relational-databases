const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const {syncModels} = require('./models')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/notes', notesRouter);
app.use('/api/users',usersRouter);
app.use('/api/login',loginRouter)

const start = async () => {
  await connectToDatabase()
  await syncModels
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
};

start()
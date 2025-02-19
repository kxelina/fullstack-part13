const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { errorHandler } = require('./util/middleware')   
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blog')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

start()


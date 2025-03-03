const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { errorHandler } = require('./util/middleware')   
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blog')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const readinglistRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistRouter)
app.use('/api/logout', logoutRouter)

app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

start()


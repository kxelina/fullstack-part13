const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const Session = require('../models/session')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({ error: error.message })
    }

    if (error.name === 'SequelizeDatabaseError') {
        return response.status(400).json({ error: 'Database error', message: error.message })
    }
    next(error)
}

const tokenExtractor = async(req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        const token = authorization.substring(7)
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        const session = await Session.findOne({where: {token: token}})
       
        if (!session) {
          return res.status(401).json({ error: 'token invalid' })
        }
        req.token = token
      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
  }

module.exports = {
    errorHandler, tokenExtractor
}
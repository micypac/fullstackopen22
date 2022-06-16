const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path  : ', req.path)
  logger.info('Body:   ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown Endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'invalid or missing token' })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token = authorization.substring(7)

    try {
      req.decodedToken = jwt.verify(req.token, process.env.SECRET)
    } catch(ex) {
      next(ex)
    }
  } else {
    req.token = null
  }

  next()
}

const userExtractor = async (req, res, next) => {
  if (req.decodedToken){
    req.user = await User.findById(req.decodedToken.id)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
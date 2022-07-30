const { ApolloServer } = require('apollo-server')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    introspection: true,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null

      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = await jwt.verify(auth.substring(7), SECRET)
        const currentUser = await User.findById(decodedToken.id)

        return { currentUser }
      }
    },
    pugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start()

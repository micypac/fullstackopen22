const { UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const SECRET = process.env.JWT_SECRET
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }

      // Author or genre filters
      if (args.author && args.genre) {
        const query = { author: args.author, genres: { $in: args.genre } }
        return Book.find(query)
      } else if (args.author && !args.genre) {
        const query = { author: args.author }
        return Book.find(query)
      } else {
        const query = { genres: { $in: args.genre } }
        return Book.find(query)
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Book: {
    author: async (root) => {
      // console.log('***Book Object Resolver***', root)
      const query = { _id: root.author }
      return Author.findOne(query)
    },
  },
  Author: {
    bookCount: async (root) => {
      // console.log('***Author Object Resolver***', root)
      const query = { author: root._id }
      return Book.collection.countDocuments(query)
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }

      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('invalid login credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      // console.log('***addBook Mutation***', args)

      if (!currentUser) {
        throw new AuthenticationError('user not authenticated')
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })

        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message)

          // throw new UserInputError(error.message, {
          //   invalidArgs: args,
          // })
        }
      }

      const book = new Book({ ...args, author: author._id })
      console.log('***addBook Mutation book***', book)
      let returnedBook

      try {
        await book.populate('author', { name: 1 })
        returnedBook = await book.save()
        console.log('***addBook Mutation returnedBook***', returnedBook)
      } catch (error) {
        throw new UserInputError(error.message)
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return returnedBook
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('user not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }

      return author
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers

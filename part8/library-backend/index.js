const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

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
      console.log('***addBook Mutation***', args)

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

      try {
        await book.populate('author', { name: 1 })
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }

      return book
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
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    // console.log('***request***', req)
    const auth = req ? req.headers.authorization : null

    console.log('***Auth***', auth)

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = await jwt.verify(auth.substring(7), SECRET)
      const currentUser = await User.findById(decodedToken.id)

      console.log('***current user***', currentUser)

      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

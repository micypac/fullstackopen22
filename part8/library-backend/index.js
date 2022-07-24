const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

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
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
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
    addBook: async (root, args) => {
      console.log('***addBook Mutation***', args)

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        })

        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            ivalidArgs: args,
          })
        }
      }

      const book = new Book({ ...args, author: author._id })

      try {
        await book.populate('author', { name: 1 })
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) return null

      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

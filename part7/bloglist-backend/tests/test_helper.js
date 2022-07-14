const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initUserDb = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('godmode', 10)

  const user = new User({
    username: 'micpac',
    name: 'michael p',
    passwordHash
  })

  await user.save()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  initUserDb
}
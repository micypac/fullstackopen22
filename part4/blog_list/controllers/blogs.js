const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }

  return null
}

blogsRouter.get('/', async (req, res) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  /*
  Getting random user from users collection and using user.id to create blog.
  */
  // const userArr = await User.aggregate([
  //   { $sample: { size: 1 } }
  // ])
  // const user = await User.findById(userArr[0]._id)

  /*
  Getting tokenized user.id from request authorization header.
  */
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id){
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body. author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
      blog,
      {
        new: true,
        runValidators: true,
        context: 'query'
      })
    res.json(updatedBlog)
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter
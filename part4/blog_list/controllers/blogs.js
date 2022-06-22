const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', async (req, res, next) => {

  if (!req.token) {
    return res.status(401).json({ error: 'token missing' })
  }

  const body = req.body
  const user = req.user

  const blog = new Blog({
    title: body.title,
    author: body. author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try {
    await blog.populate('user', { username: 1, name: 1 })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  // check if token exist in request header
  if (!req.token){
    return res.status(401).json({ error: 'token missing' })
  }

  const decodedToken = req.decodedToken
  const user = req.user
  let blog

  // retrieve blog and check if exist from collections
  try {
    blog = await Blog.findById(req.params.id)

    if(!blog) {
      return res.status(404).json({ error: 'blog does not exist' })
    }
  } catch(ex) {
    next(ex)
  }

  // console.log('blog user id :', typeof(blog.user.toString()), blog.user.toString())
  // console.log('decoded id   :', typeof(decodedToken.id), decodedToken.id.toString())
  // console.log('user id      :', typeof(user.id), user.id.toString())

  // compare blog creator and requestor if the same user.id
  if (blog.user.toString() !== decodedToken.id){
    return res.status(401).json({ error: 'permission denied: user did not create blog' })
  }

  try {
    await Blog.findByIdAndRemove(req.params.id)

    user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString())
    await user.save()
    res.status(204).end()

  }catch(exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  console.log('*****REQUEST BODY*****', body)

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id,
      blog,
      {
        new: true,
        runValidators: true,
        context: 'query'
      })
      .populate('user', { username: 1, name: 1 })
    res.json(updatedBlog)
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter
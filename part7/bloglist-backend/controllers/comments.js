const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (req, res, next) => {
  let blog

  try {
    blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({ error: 'blog does not exist' })
    }
  } catch (ex) {
    next(ex)
  }

  const body = req.body
  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  })

  try {
    await comment.populate('blog', { title: 1, url: 1 })
    const savedComment = await comment.save()

    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    res.status(201).json(savedComment)
  } catch (ex) {
    next(ex)
  }
})

module.exports = commentsRouter

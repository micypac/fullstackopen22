const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Blog collections cleared...')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArr)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('all blogs are returned', async () => {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body).toHaveLength(helper.initialBlogs.length)
})


test('unique identifier property of blog', async () => {
  const blogs = await api.get('/api/blogs')
  blogs.body.map(blog => expect(blog.id).toBeDefined())
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Miss Komi-unnication',
    author: 'Shuoko Komi',
    url: 'https://komi-san-cant-communicate/',
    likes: 33
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const contents = (await blogsAtEnd).map(blog => blog.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('Miss Komi-unnication')
})


test('likes property will default to zero', async () => {
  const newBlog = {
    title: 'Miss Komi-unication',
    author: 'Shuoko Komi',
    url: 'https://komi-san-cant-communicate/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogAdded = blogsAtEnd.find(blog => blog.title === 'Miss Komi-unication')
  expect(blogAdded.likes).toBe(0)
})


test('blog with title or url missing is not added', async () => {
  const newBlog = {
    author: 'Hitohito Tadano'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})
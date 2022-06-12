const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

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


afterAll(() => {
  mongoose.connection.close()
})
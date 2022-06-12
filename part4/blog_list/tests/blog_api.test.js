const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Blog collections cleared...')

  // const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArr = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArr)
  await Blog.insertMany(helper.initialBlogs)
})

describe('there are initially some blogs saved', () => {
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


  test('unique identifier property of blog is named id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.map(blog => expect(blog.id).toBeDefined())
  })


  test('a specific blog title is within the returned blogs', async () => {
    const blogs = await helper.blogsInDb()
    const blogTitles = blogs.map(blog => blog.title)

    expect(blogTitles).toContain('React patterns')
  })
})


describe('addition of blog', () => {
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
})


describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('update likes property of a blog', () => {
  test('blog likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 50

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogUpdated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(blogUpdated.likes).toBe(50)

  })
})


afterAll(() => {
  mongoose.connection.close()
})
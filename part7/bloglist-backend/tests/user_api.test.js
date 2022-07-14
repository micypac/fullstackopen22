const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekreto', 10)
  const user = new User({
    username: 'root',
    passwordHash
  })

  await user.save()
})

describe('addition of users', () => {

  test('successful creation of new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ironman',
      name: 'tony stark',
      password: 'tstark'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('COntent-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username already exist yields proper status code and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'hacker'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username already exist')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('username too short yields proper status code and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'yo',
      name: 'yoman',
      password: 'hacker'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('password too short yields proper status code and error message', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'yohacker',
      name: 'yoman park',
      password: 'ae'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password must be at least 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

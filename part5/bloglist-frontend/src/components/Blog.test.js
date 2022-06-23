import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('blog renders title and author', () => {
  const blogObj = {
    title: 'Testing React Apps',
    author: 'john smith',
    url: 'https://example.com/testing-react-apps',
    likes: 2
  }

  const userObj = {
    id: '12345',
    name: 'john smith',
    username: 'jsmith01'
  }

  const incLikesHandler = jest.fn()
  const removeBlogHandler = jest.fn()

  render(
    <Blog blog={blogObj} user={userObj} incLikes={incLikesHandler} removeBlog={removeBlogHandler} />
  )

  const element = screen.getByText('Testing React Apps john smith')
  expect(element).toBeDefined()
})

test('show button will render blog url and likes', async () => {
  const blogObj = {
    title: 'Testing React Apps',
    author: 'john smith',
    url: 'https://example.com/testing-react-apps',
    likes: 2
  }

  const userObj = {
    id: '12345',
    name: 'john smith',
    username: 'jsmith01'
  }

  const incLikesHandler = jest.fn()
  const removeBlogHandler = jest.fn()

  render(
    <Blog blog={blogObj} user={userObj} incLikes={incLikesHandler} removeBlog={removeBlogHandler} />
  )

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)

  const urlElement = screen.findByText('https://example.com/testing-react-apps')
  const likesElement = screen.findByText('likes 2')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()

})

test('clicking the like button twice will call the event handler the same amount', async () => {
  const blogObj = {
    title: 'Testing React Apps',
    author: 'john smith',
    url: 'https://example.com/testing-react-apps',
    likes: 2
  }

  const userObj = {
    id: '12345',
    name: 'john smith',
    username: 'jsmith01'
  }

  const incLikesHandler = jest.fn()
  const removeBlogHandler = jest.fn()

  render(
    <Blog blog={blogObj} user={userObj} incLikes={incLikesHandler} removeBlog={removeBlogHandler} />
  )

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)

  const likeButton = screen.getByText('Like!')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(incLikesHandler.mock.calls).toHaveLength(2)
})
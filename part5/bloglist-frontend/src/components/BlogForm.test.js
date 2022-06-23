import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('<BlogForm /> calls props event handler', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Testing BlogForm')
  await user.type(authorInput, 'jane doe')
  await user.type(urlInput, 'https://example.com/testing-blogform')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing BlogForm')
  expect(createBlog.mock.calls[0][0].author).toBe('jane doe')
  expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/testing-blogform')


})
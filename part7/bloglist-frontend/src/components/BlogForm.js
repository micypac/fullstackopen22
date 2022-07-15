import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogAction } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/messageReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlogAction({
        title: title,
        author: author,
        url: url,
      }),
    )

    const notice = {
      message: `a new blog ${title} by ${author} added`,
      className: 'success',
    }

    dispatch(setNotification(notice, 5))

    setTitle('')
    setAuthor('')
    setUrl('')

    props.blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="blog title"
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="blog author"
          />
          <Form.Label>URL:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="blog url"
          />
        </Form.Group>

        <Button id="submit-button" variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm

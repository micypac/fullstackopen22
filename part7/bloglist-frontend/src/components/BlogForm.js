import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogAction } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/messageReducer'

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
      className: 'added',
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
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="blog title"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
            placeholder="blog author"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="blog url"
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

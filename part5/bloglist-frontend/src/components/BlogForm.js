import { useState } from 'react'

const BlogForm = (props) => {

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

    props.createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:<input type='text' name='Title' value={title} onChange={handleTitleChange} placeholder='blog title' />
        </div>
        <div>
          author:<input type='text' name='Title' value={author} onChange={handleAuthorChange} placeholder='blog author' />
        </div>
        <div>
          url:<input type='text' name='Url' value={url} onChange={handleUrlChange} placeholder='blog url' />
        </div>
        <button type='submit'>create</button>
      </form>

    </div>
  )
}

export default BlogForm
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, incLikes, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // console.log(blog)

  return (
    <div className='blog' style={blogStyle}>
      <span>{blog.title} {blog.author}</span> <button id='toggle-button' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>

      <div style={showWhenVisible}>
        {blog.url}
        <br/><span id='likes-info'>likes {blog.likes}</span> <button id='like-button' onClick={incLikes}>Like!</button>
        <br/> {blog.user ? blog.user.name : ''}
        <br/> {blog.user ? blog.user.id === user.id ? <button id='remove-button' onClick={removeBlog}>remove</button> : null : ''}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  incLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
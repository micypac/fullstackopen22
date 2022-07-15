// import PropTypes from 'prop-types'
import {
  addLikesAction,
  removeBlogAction,
  addCommentAction,
} from '../reducers/blogsReducer'
import { setNotification } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const deleteBlog = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlogAction(id))

      const notice = {
        message: `you deleted blog ${blog.title} by ${blog.author}`,
        className: 'update',
      }

      dispatch(setNotification(notice, 5))
    }
  }

  const incrementLikes = async (id) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(addLikesAction(id, updatedBlog))

    const notice = {
      message: `you liked ${updatedBlog.title} by ${updatedBlog.author}`,
      className: 'update',
    }

    dispatch(setNotification(notice, 5))
  }

  const addComment = (event) => {
    // event.preventDefault()

    const commentText = event.target.comment.value
    const blogId = event.target.blogId.value

    const commentObj = {
      content: commentText,
    }

    dispatch(addCommentAction(blogId, commentObj))
    event.target.comment.value = ''

    const notice = {
      message: `you added comment to ${blog.title}`,
      className: 'added',
    }

    dispatch(setNotification(notice, 5))
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span>Likes: {blog.likes}</span>{' '}
          <button id="like-button" onClick={() => incrementLikes(blog.id)}>
            Like!
          </button>
        </p>
        <p>{blog.user ? `added by ${blog.user.name}` : ''}</p>
        <p>
          {blog.user ? (
            blog.user.id === user.id ? (
              <button id="remove-button" onClick={() => deleteBlog(blog.id)}>
                remove
              </button>
            ) : null
          ) : (
            ''
          )}
        </p>

        <h3>Comments</h3>

        <form onSubmit={addComment}>
          <input name="comment" />
          <input type="hidden" name="blogId" value={blog.id} />
          <button type="submit">add comment</button>
        </form>

        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   user: PropTypes.object.isRequired,
//   // incLikes: PropTypes.func.isRequired,
//   // removeBlog: PropTypes.func.isRequired,
// }

export default Blog

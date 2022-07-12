import { useDispatch, useSelector } from 'react-redux'
import { addLikesAction, removeBlogAction } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/messageReducer'

import Blog from './Blog'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const deleteBlog = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)

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
    const blog = blogs.find((blog) => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(addLikesAction(id, updatedBlog))

    const notice = {
      message: `you liked ${updatedBlog.title} by ${updatedBlog.author}`,
      className: 'update',
    }

    dispatch(setNotification(notice, 5))
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          incLikes={() => incrementLikes(blog.id)}
          removeBlog={() => deleteBlog(blog.id)}
        />
      ))}
    </div>
  )
}

export default Blogs

import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  console.log(dispatch)
  const deleteBlog = async (id) => {
    console.log(id)
    // const blog = blogs.find((blog) => blog.id === id)

    // if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
    //   await blogService.remove(id)
    //   setBlogs(blogs.filter((blog) => blog.id !== id))
    // }
  }

  const incrementLikes = async (id) => {
    console.log(id)
    // const blog = blogs.find((blog) => blog.id === id)
    // const updatedBlog = { ...blog, likes: (blog.likes += 1) }

    // const returnedBlog = await blogService.update(id, updatedBlog)
    // setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
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

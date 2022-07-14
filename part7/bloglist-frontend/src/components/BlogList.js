import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderColor: 'silver',
    borderRadius: 5,
    borderWidth: 3,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList

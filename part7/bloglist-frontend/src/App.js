import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/userListReducer'
import { setUser } from './reducers/userReducer'

import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useMatch,
  useNavigate,
  Link,
} from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))

      blogService.setToken(user.token)
    }
  }, [])

  const registeredUsers = useSelector((state) => state.users)

  const userMatch = useMatch('/users/:id')
  const userProfile = userMatch
    ? registeredUsers.find((user) => user.id === userMatch.params.id)
    : null

  const blogs = useSelector((state) => state.blogs)

  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    dispatch(setUser(null))
    navigate('/')
  }

  const BlogsContent = () => (
    <div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
      </div>

      <div>
        <BlogList user={user} />
      </div>
    </div>
  )

  if (user === null) {
    return (
      <div className="container">
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div className="container">
        <header>
          <h1>Blogs</h1>
          <div style={{ backgroundColor: 'lightgrey' }}>
            <Link style={{ padding: 5 }} to="/">
              Home
            </Link>
            <Link style={{ padding: 5 }} to="/blogs">
              Blogs
            </Link>
            <Link style={{ padding: 5 }} to="/users">
              Users
            </Link>
            <span style={{ fontStyle: 'italic' }}>{user.name} logged in </span>
            <button id="logout-button" onClick={handleLogout} type="button">
              logout
            </button>
          </div>
          <Notification />
        </header>

        <Routes>
          <Route path="/" element={<BlogsContent />} />
          <Route path="/blogs" element={<BlogsContent />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User user={userProfile} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
        </Routes>
      </div>
    )
  }
}

export default App

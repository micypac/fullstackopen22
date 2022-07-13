import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogsReducer'
// import { initializeUsers } from './reducers/userListReducer'
import { setUser } from './reducers/userReducer'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // useEffect(() => {
  //   dispatch(initializeUsers())
  // })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(setUser(user))

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    dispatch(setUser(null))
  }

  const BlogsContent = () => (
    <div>
      <div style={{ marginTop: 20 }}>
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
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <header>
          <h1>Blogs</h1>
          <Notification />
          <div>
            <p>{user.name} logged in</p>
            <button id="logout-button" onClick={handleLogout} type="button">
              logout
            </button>
          </div>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<BlogsContent />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

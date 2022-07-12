import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
        <h1>Blogs</h1>
        <Notification />
        <div>
          <p>{user.name} logged in</p>
          <button id="logout-button" onClick={handleLogout} type="button">
            logout
          </button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </div>

        <br />
        <Blogs user={user} />
      </div>
    )
  }
}

export default App

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('added')

  const blogFormRef = useRef()

  const sortBlogs = (arr) => {
    const newArr = [...arr]
    newArr.sort((a,b) => b.likes - a.likes)
    return newArr
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)

    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      console.log(exception)
      setMessageType('error')
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (blogObject) => {

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setMessageType('added')
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    blogFormRef.current.toggleVisibility()
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const incrementLikes = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes += 1 }

    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button id='login-button' type="submit">login</button>
    </form>
  )


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} displayClass={messageType} />
        {loginForm()}
      </div>
    )

  } else {
    return (
      <div>
        <h1>Blogs</h1>
        <Notification message={message} displayClass={messageType} />
        <p>{user.name} logged in <button id='logout-button' onClick={handleLogout} type='button'>logout</button></p>

        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} incLikes={() => incrementLikes(blog.id)} removeBlog={() => deleteBlog(blog.id)} />
        )}
      </div>
    )
  }
}

export default App

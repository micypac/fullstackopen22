import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('added')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setTitle('')
    setAuthor('')
    setUrl('')

    setMessageType('added')
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
                
      <button type="submit">login</button>
    </form>
  )


  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:<input type='text' name='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>
      <div>
        author:<input type='text' name='Title' value={author} onChange={(event) => setAuthor(event.target.value)} />
      </div>
      <div>
        url:<input type='text' name='Url' value={url} onChange={(event) => setUrl(event.target.value)} />
      </div>
      <button type='submit'>create</button>
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
        <p>{user.name} logged in <button onClick={handleLogout} type='button'>logout</button></p>
        
        <Togglable buttonLabel='new blog'>
          <h2>Create New Blog</h2>
          {blogForm()}
        </Togglable>
        <br />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )    
  }
}

export default App

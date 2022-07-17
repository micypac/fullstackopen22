import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/userListReducer'
import { setUser } from './reducers/userReducer'

import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const Home = () => (
    <Container>
      <h1> Blog App</h1>
      <p>
        This entire application serves as a project exercise from Fullstackopen
        course. The course is an introduction to modern web application
        development with JavaScript. The main focus is on building single page
        applications with ReactJS that use REST APIs built with Node.js. The
        course also contains a section on GraphQL, a modern alternative to REST
        APIs.
      </p>
      <p>
        The course covers testing, configuration and environment management, and
        the use of MongoDB for storing the application’s data.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Container>
  )

  return (
    <div className="container">
      <header>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#" as="span">
              Blog App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={{ padding: 5 }} to="/">
                    Home
                  </Link>
                </Nav.Link>

                {user ? (
                  <Nav>
                    <Nav.Link href="#" as="span">
                      <Link style={{ padding: 5 }} to="/blogs">
                        Blogs
                      </Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link style={{ padding: 5 }} to="/users">
                        Users
                      </Link>
                    </Nav.Link>

                    <Navbar.Text>
                      <span
                        style={{
                          fontStyle: 'italic',
                          padding: 5,
                          marginRight: 10,
                        }}
                      >
                        {user.name} logged in{' '}
                      </span>
                    </Navbar.Text>
                  </Nav>
                ) : (
                  <Nav.Link href="#" as="span">
                    <Link style={{ padding: 5 }} to="/login">
                      Login
                    </Link>
                  </Nav.Link>
                )}

                {user ? (
                  <Button
                    id="logout-button"
                    onClick={handleLogout}
                    type="button"
                    variant="secondary"
                  >
                    logout
                  </Button>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Notification />
      </header>
      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users/:id" element={<User user={userProfile} />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

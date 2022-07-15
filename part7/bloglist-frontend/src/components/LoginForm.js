import { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/messageReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      dispatch(setUser(user))

      const notice = {
        message: `Welcome ${user.username}`,
        className: 'success',
      }

      dispatch(setNotification(notice, 5))
    } catch (exception) {
      const notice = {
        message: exception.response.data.error,
        className: 'danger',
      }

      dispatch(setNotification(notice, 5))
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>

      <Button id="login-button" variant="primary" type="submit">
        login
      </Button>
    </Form>
  )
}

export default LoginForm

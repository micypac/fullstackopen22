import { useSelector } from 'react-redux'
// import { initializeUsers } from '../reducers/userListReducer'
// import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import User from './User'

const UserList = () => {
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [])

  const users = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Blog Creator</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList

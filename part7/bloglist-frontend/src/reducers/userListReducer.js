import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userListSlice = createSlice({
  name: 'userList',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = userListSlice.actions
export default userListSlice.reducer

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

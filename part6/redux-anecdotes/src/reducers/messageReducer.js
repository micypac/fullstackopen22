import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    createMessage(state, action) {
      state = action.payload
      return state
    },
    nullMessage(state, action) {
      state = null
      return state
    }
  }
})

export const { createMessage, nullMessage } = messageSlice.actions
export default messageSlice.reducer
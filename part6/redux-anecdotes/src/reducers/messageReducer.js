import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Initial notification message!'

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    createMessage(state, action) {
      state = action.payload
    }
  }
})

export const { createMessage } = messageSlice.actions
export default messageSlice.reducer
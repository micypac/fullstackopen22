import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../reducers/anecdoteReducer'
import messageReducer from '../reducers/messageReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    message: messageReducer
  }
})

export default store

import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../reducers/anecdoteReducer'
import messageReducer from '../reducers/messageReducer'
import filterReducer from '../reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    message: messageReducer,
    filter: filterReducer
  }
})

export default store

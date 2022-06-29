import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from '../reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer
  }
})

export default store

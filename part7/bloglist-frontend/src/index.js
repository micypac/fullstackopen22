import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import userListReducer from './reducers/userListReducer'

import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: messageReducer,
    user: userReducer,
    users: userListReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    createBlog(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    addLikes(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
  },
})

export const { setBlogs, createBlog, addLikes } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlogAction = (blogObj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObj)
    dispatch(createBlog(newBlog))
  }
}

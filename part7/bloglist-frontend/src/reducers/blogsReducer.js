import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comment'

const sortBlogs = (arr) => {
  const newArr = [...arr]
  newArr.sort((a, b) => b.likes - a.likes)
  return newArr
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return sortBlogs(action.payload)
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
    removeBlog(state, action) {
      state = state.filter((blog) => blog.id !== action.payload)
      return sortBlogs(state)
    },
    addComment(state, action) {
      state = state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
      return state
    },
  },
})

export const { setBlogs, createBlog, addLikes, removeBlog, addComment } =
  blogSlice.actions
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

export const addLikesAction = (id, newObj) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, newObj)
    dispatch(addLikes(returnedBlog))
  }
}

export const removeBlogAction = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addCommentAction = (id, commentObj) => {
  return async (dispatch) => {
    const returnedBlog = await commentService.create(id, commentObj)
    dispatch(addComment(returnedBlog))
  }
}

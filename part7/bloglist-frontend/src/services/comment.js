import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (blogId, commentObj) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObj)
  return response.data
}

export default {
  create,
}

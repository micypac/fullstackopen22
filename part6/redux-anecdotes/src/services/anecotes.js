import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newObject = {
    content,
    votes: 0
  }

  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

const anecdoteService = {
  getAll: getAll,
  create: create,
  update: update
}

export default anecdoteService
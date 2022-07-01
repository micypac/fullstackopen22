import { useDispatch } from 'react-redux'
import { createAnecdoteAction } from '../reducers/anecdoteReducer'
// import anecdoteService from '../services/anecotes'
import { setNotification } from '../reducers/messageReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdoteAction(content))
    const message = `you created '${content}'`
    dispatch(setNotification(message, 5))
    // dispatch(createMessage(message))
    // setTimeout(() => {
    //   dispatch(nullMessage())
    // }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
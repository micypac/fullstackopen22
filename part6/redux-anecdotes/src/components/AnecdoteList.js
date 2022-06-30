import { useDispatch, useSelector } from 'react-redux'
import { addVotesOf } from '../reducers/anecdoteReducer'
import { createMessage, nullMessage } from '../reducers/messageReducer'


const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVotes = (id) => {
    dispatch(addVotesOf(id))
    const selectAnecdote = anecdotes.find(a => a.id === id)
    const message = `you voted '${selectAnecdote.content}'`
    dispatch(createMessage(message))
    setTimeout(() => {
      dispatch(nullMessage())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        // <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => dispatch(addVotesOf(anecdote.id))} />
        <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVotes(anecdote.id)} />
      )}
    </div>
  )
}

export default AnecdoteList

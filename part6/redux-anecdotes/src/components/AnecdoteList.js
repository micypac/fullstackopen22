import { useDispatch, useSelector } from 'react-redux'
import { addVotesAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'


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
  const anecdotes = useSelector((state) => {
    if (!state.filter) {
      return state.anecdotes
    }

    return state.anecdotes.filter(item => item.content.toLowerCase().includes(state.filter.toLowerCase()))
  })


  // const handleVotes = (id) => {
  //   dispatch(addVotesOf(id))
  //   const selectAnecdote = anecdotes.find(a => a.id === id)
  //   const message = `you voted '${selectAnecdote.content}'`
  //   dispatch(createMessage(message))
  //   setTimeout(() => {
  //     dispatch(nullMessage())
  //   }, 5000)
  // }

  const handleVotes = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    dispatch(addVotesAction(id, votedAnecdote))
    const message = `you voted '${anecdote.content}'`
    dispatch(setNotification(message, 5))
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

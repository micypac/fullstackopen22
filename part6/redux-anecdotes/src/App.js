import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import anecdoteService from '../services/anecotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/FilterForm'

const App = () => {
  
  const dispatch = useDispatch()
  // useEffect(() => {
  //   anecdoteService.getAll()
  //     .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  // }, [dispatch])

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />

      
    </div>
  )
}

export default App
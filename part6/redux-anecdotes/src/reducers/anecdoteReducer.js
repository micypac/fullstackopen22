import { createSlice } from '@reduxjs/toolkit'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map((item) => {
//   return asObject(item)
// })

const sortAnecdotes = (arr) => {
  const newArr = [...arr]
  newArr.sort((a,b) => b.votes - a.votes)
  return newArr
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  // initialState: sortAnecdotes(initialState),
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    addVotesOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return sortAnecdotes(state.map(item => item.id !== id ? item : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { createAnecdote, addVotesOf, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// const anecdotesReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type){
    
//     case 'VOTE': {
//       const id = action.data.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }

//       const newState = state.map(item => item.id !== id ? item : changedAnecdote)
//       return sortAnecdotes(newState)
//     }

//     case 'NEW_ANECDOTE':
//       return sortAnecdotes(state.concat(action.data))

//     default:
//       return sortAnecdotes(state)
//   }  
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data: asObject(content)
//   }
// }

// export const addVotesOf = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export default anecdotesReducer
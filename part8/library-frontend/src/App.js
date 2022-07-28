import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import BookRecommendation from './components/BookRecommendation'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [genreFilter, setGenreFilter] = useState('all')
  const client = useApolloClient()

  useEffect(() => {
    const token = window.localStorage.getItem('library-user-token')

    if (token) {
      setToken(token)
    } else {
      setToken(null)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('favoriteGenre')}>recommend</button>
            <button onClick={handleLogout}>log-out</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books
        show={page === 'books'}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
      />

      <NewBook show={page === 'add'} genreFilter={genreFilter} />

      <BookRecommendation show={page === 'favoriteGenre'} token={token} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('all')

  if (!props.show) {
    return null
  }

  // const books = []

  if (result.loading) {
    return <div>loading...</div>
  }

  // console.log(result)

  const books = result.data.allBooks
  const genres = books.reduce((acc, element) => {
    for (const genre of element.genres) {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    }
    return acc
  }, [])

  // console.log(genres)
  console.log(genreFilter)

  let booksList
  if (genreFilter === 'all') {
    booksList = books
  } else {
    booksList = books.filter((book) => book.genres.includes(genreFilter))
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksList.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <fieldset>
        <legend>
          <h3>Genres</h3>
        </legend>
        <div>
          <input
            type="radio"
            name="genres"
            value="all"
            id="all"
            checked={genreFilter === 'all'}
            onChange={() => setGenreFilter('all')}
          />
          <label htmlFor="all">all</label>
        </div>
        {genres.map((genre) => (
          <div key={genre}>
            <input
              type="radio"
              name="genres"
              value={genre}
              id={genre}
              checked={genreFilter === genre}
              onChange={() => setGenreFilter(genre)}
            />
            <label htmlFor={genre}>{genre}</label>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default Books

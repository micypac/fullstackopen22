// import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'

const Books = ({ show, genreFilter, setGenreFilter }) => {
  // const [genreFilter, setGenreFilter] = useState('all')
  const result = useQuery(ALL_BOOKS)

  const resultBookByGenre = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: genreFilter,
    },
    skip: genreFilter === 'all',
  })

  if (!show) {
    return null
  }

  if (result.loading || resultBookByGenre.loading) {
    return <div>query loading...</div>
  }

  const books = result.data.allBooks
  if (!resultBookByGenre.loading) {
    console.log(resultBookByGenre)
  }

  const booksByGenre =
    genreFilter !== 'all' && !resultBookByGenre.loading
      ? resultBookByGenre.data.allBooks
      : null

  const genres = books.reduce((acc, element) => {
    for (const genre of element.genres) {
      if (!acc.includes(genre)) {
        acc.push(genre)
      }
    }
    return acc
  }, [])

  // console.log(genres)
  // console.log(genreFilter)

  // let booksList
  // if (genreFilter === 'all') {
  //   booksList = books
  // } else {
  //   booksList = books.filter((book) => book.genres.includes(genreFilter))
  // }

  const booksList = genreFilter === 'all' ? books : booksByGenre

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

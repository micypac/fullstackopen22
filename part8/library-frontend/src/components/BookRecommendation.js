// import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const BookRecommendation = (props) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(ME)

  if (!props.show) return null

  if (resultBooks.loading || resultUser.loading) {
    return <div>loading...</div>
  }

  // console.log(resultUser)

  const favoriteGenre = resultUser.data.me.favoriteGenre

  const suggestedBooks = resultBooks.data.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre),
  )

  return (
    <div>
      <h2>Recommended Books</h2>
      <p>
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {suggestedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookRecommendation

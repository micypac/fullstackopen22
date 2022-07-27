import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ME } from '../queries'

const BookRecommendation = (props) => {
  const resultUser = useQuery(ME, {
    skip: props.token === null,
  })
  const resultBookByGenre = useQuery(BOOKS_BY_GENRE, {
    skip: !resultUser.data,
    variables: {
      genre: resultUser.data ? resultUser.data.me.favoriteGenre : '',
    },
  })

  if (!props.show) return null

  if (resultBookByGenre.loading || resultUser.loading) {
    return <div>loading...</div>
  }

  const favoriteGenre = resultUser.data.me.favoriteGenre
  const suggestedBooks = resultBookByGenre.data.allBooks

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

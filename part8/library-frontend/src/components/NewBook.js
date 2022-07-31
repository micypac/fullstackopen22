import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK, BOOKS_BY_GENRE } from '../queries'
import { updateCache } from '../App'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      // { query: ALL_BOOKS },
      // { query: BOOKS_BY_GENRE, variables: { genre: props.genreFilter } },
      { query: ALL_AUTHORS },
    ],
    onError: (error) => {
      console.log(error)
    },
    update: (cache, res) => {
      if (props.genreFilter === 'all') {
        updateCache(cache, { query: ALL_BOOKS }, res.data.addBook)
      } else {
        updateCache(
          cache,
          { query: BOOKS_BY_GENRE, variables: { genre: props.genreFilter } },
          res.data.addBook,
        )
      }
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    await createBook({
      variables: {
        title: title,
        author: author,
        published: parseInt(published),
        genres: genres,
      },
    })

    props.setMessage(`new book ${title} added`)

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook

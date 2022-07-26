import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBirthyear, resultBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (resultBirthyear.data && resultBirthyear.data.editAuthor === null) {
      console.log('Author not found...')
    }
  }, [resultBirthyear.data])

  const handleSubmit = (event) => {
    event.preventDefault()

    changeBirthyear({
      variables: {
        name: name,
        setBornTo: parseInt(born),
      },
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <fieldset disabled={props.token ? false : true}>
          <legend>
            <h3>Set Birthyear</h3>
          </legend>
          <label htmlFor="author">Author:</label>
          <select
            name="author"
            value={name}
            onChange={(event) => setName(event.target.value)}
          >
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <div>
            <label htmlFor="birthyear">Born:</label>
            <input
              name="birthyear"
              value={born}
              onChange={(event) => setBorn(event.target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Authors

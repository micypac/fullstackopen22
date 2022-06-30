import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    borderColor: 'green',
    background: 'lightgrey',
    padding: 10,
    borderWidth: 5
  }
  
  const message = useSelector(state => state.message)

  if (message === null) {
    return null
  }
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
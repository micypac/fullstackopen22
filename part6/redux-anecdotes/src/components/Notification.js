import { connect } from 'react-redux'


const Notification = (props) => {
  const style = {
    border: 'solid',
    borderColor: 'green',
    background: 'lightgrey',
    padding: 10,
    borderWidth: 5
  }
  
  // const message = useSelector(state => state.message)
  const message = props.message

  if (message === null) {
    return null
  }
  
  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
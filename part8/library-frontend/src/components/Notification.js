const Notification = ({ appMessage }) => {
  if (!appMessage) return null

  return <div style={{ color: 'red' }}>{appMessage}</div>
}

export default Notification

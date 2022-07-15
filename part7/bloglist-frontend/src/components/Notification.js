import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <Alert variant={notification.className}>{notification.message}</Alert>
    // <div className={notification.className}>{notification.message}</div>
  )
}

export default Notification

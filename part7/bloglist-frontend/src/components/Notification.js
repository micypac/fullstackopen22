import React from 'react'
import { useSelector } from 'react-redux'

// const Notification = ({ message, displayClass }) => {
const Notification = ({ displayClass }) => {
  const message = useSelector((state) => state.message)

  if (message === null) {
    return null
  }

  return <div className={displayClass}>{message}</div>
}

export default Notification

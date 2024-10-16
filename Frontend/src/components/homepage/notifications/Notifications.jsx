import React from 'react'
import "./notification.scss"

const Notifications = () => {
  return (
    <div className='not-container'>
      <p>Notifications</p>
      <hr className="light-line" />
      <div className="select-container">
        <button>Invites</button>
        <button>Requests</button>
        <button>Hackathon Updates</button>
      </div>
      <hr className="light-line" />
    </div>
  )
}

export default Notifications

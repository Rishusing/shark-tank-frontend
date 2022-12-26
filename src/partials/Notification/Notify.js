import React, { useState, useEffect } from 'react'
import Navbar from '../Header/Navbar'
import './Notify.css'
import ads from '../../assets/ads.gif'

import EachNotification from './EachNotification'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Notify = () => {
  const user = useParams()

  const [ismsg, setIsmsg] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios
      .get(`https://shart-tank.vercel.app/messages/${user.id}`)
      .then((res) => {
        res.data.messages.reverse()
        setMessages(res.data.messages)
        setIsmsg(true)
      })
      .catch(() => {
        console.log('Something wrong in fetching notifications')
      })
  }, [user.id])

  return (
    <>
      <Navbar />
      <div className="notify_main">
        <div className="notify_child">
          <div className="notify_left">
            <img src={ads} alt="GIF" />
          </div>
          <div className="notify_middle">
            <div className="notifyBox">
              {ismsg &&
                messages.map((note) => (
                  <EachNotification noteData={note} key={note._id} />
                ))}
            </div>
          </div>
          <div className="notify_right">
            <img src={ads} alt="GIF" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Notify

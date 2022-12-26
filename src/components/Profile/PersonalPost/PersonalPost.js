import React, { useEffect, useState } from 'react'
import './PersonalPost.css'
import axios from 'axios'
import EachPitch from './EachPitch/EachPitch'

const PersonalPost = ({ userId }) => {
  const [pitches, setPitches] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/findpitches/${userId}`)
      .then((res) => {
        setPitches(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <>
      <div className="postOfUser_main">
        {pitches.length > 0 &&
          pitches.map((pitch) => (
            <EachPitch pitchData={pitch} key={pitch._id} />
          ))}
      </div>
    </>
  )
}

export default PersonalPost

import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Header/Navbar'
import './FetchPitch.css'

const FetchPitch = () => {
  const params = useParams()

  const [flag, setFlag] = useState(false)
  const [pitchData, setPitchData] = useState(false)

  useEffect(() => {
    axios
      .get(`https://shart-tank.vercel.app/singlepitche/${params.id}`)
      .then((res) => {
        setPitchData(res.data)
        setFlag(true)
      })
      .catch((e) => {
        console.log('error while fetching single pitch')
      })
  }, [params.id])

  return (
    <>
      <Navbar />
      <div className="Fetchdata_main">
        {flag && <SinglePost pitchData={pitchData} />}
      </div>
    </>
  )
}

export default FetchPitch

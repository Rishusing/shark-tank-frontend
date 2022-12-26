import React, { useState, useEffect } from 'react'
import Navbar from '../../partials/Header/Navbar'
import './Feed.css'
import { MdSubtitles } from 'react-icons/md'
import { SlUserFollowing } from 'react-icons/sl'

import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { setUser } from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import Pitch from '../../pages/Pitch/Pitch'
import Pitchmachine from './Pitchmachine/Pitchmachine'
import axios from 'axios'
import { fetchPitches } from '../../redux/slice/pitchesSlice'
import FollowNow from './FollowNow/FollowNow'
import Popup from 'reactjs-popup'
import Followers from '../Profile/Followers/Followers'

const Feed = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  const userload = useSelector((state) => state.user)

  const pitcheState = useSelector((state) => state.pitches)

  const logout = async () => {
    await signOut(auth)
    dispatch(setUser({ email: '', uid: '' }))
    navigate('/login')
  }

  const [totalCount, setCount] = useState(0)

  useEffect(() => {
    axios.get(`https://shart-tank.vercel.app//totalpitches`).then((res) => {
      setCount(res.data.totalpitches)
    })
    dispatch(fetchPitches(`https://shart-tank.vercel.app//pitches`))
  }, [])

  const nextPage = () => {}

  const previousPage = () => {}

  const showProfile = () => {
    navigate(`/profile/${userload.users._id}`)
  }

  return (
    <>
      <Navbar />
      <div className="feed_main">
        <div className="feed_left">
          <div className="feed_left_top">
            {!userload.loading && (
              <img
                src={userload.users.avatar}
                alt="Avatar"
                onClick={showProfile}
              />
            )}
            {!userload.loading && <h2>{userload.users.profile}</h2>}
            {!userload.loading && <p>{userload.users.name}</p>}
          </div>
          <div className="feed_left_bottom">
            <div className="feed_left_bottom_detail">
              <div className="followers">
                <SlUserFollowing />

                {!userload.loading && (
                  <>
                    <button onClick={() => setOpen((o) => !o)}>
                      &nbsp;{userload.users.followers.length} followers
                    </button>
                    <Popup
                      open={open}
                      closeOnDocumentClick
                      onClose={closeModal}
                    >
                      <Followers
                        followers={userload.users.followers}
                        setOpen={setOpen}
                      />
                    </Popup>
                  </>
                )}
              </div>

              {!userload.loading && userload.users.profile === 'entrepreneur' && (
                <div className="myPitches">
                  <MdSubtitles />
                  &nbsp;
                  <button onClick={showProfile}>My Pitches</button>
                </div>
              )}

              <div className="Logout_section">
                <button onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
        <div className="feed_middle">
          {!userload.loading && userload.users.profile === 'entrepreneur' && (
            <div className="feed_post">
              <div className="feed_profile">
                {!userload.loading && (
                  <img
                    src={userload.users.avatar}
                    alt="Avatar"
                    width="100%"
                    height="100%"
                    onClick={showProfile}
                  />
                )}
              </div>
              <div className="Hi_there">
                <h2 className="animate-charcter">WELCOME TO SHARK TANK</h2>
              </div>
              <div className="feed_ask">
                <Pitchmachine />
              </div>
            </div>
          )}

          <div className="feed_pitches">
            {!userload.loading &&
              !pitcheState.loading &&
              pitcheState.pitches.map((pitch) => (
                <Pitch key={pitch._id} pitchData={pitch} />
              ))}
          </div>
        </div>
        <FollowNow />
      </div>
    </>
  )
}

export default Feed

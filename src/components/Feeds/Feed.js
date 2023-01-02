import React, { useState, useEffect } from 'react'
import Navbar from '../../partials/Header/Navbar'
import './Feed.css'
import { MdSubtitles } from 'react-icons/md'
import { SlUserFollowing } from 'react-icons/sl'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { setUser } from '../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import Pitch from '../../pages/Pitch/Pitch'
import Pitchmachine from './Pitchmachine/Pitchmachine'
import axios from 'axios'

import FollowNow from './FollowNow/FollowNow'
import Popup from 'reactjs-popup'
import Followers from '../Profile/Followers/Followers'
import Skeleton from './Skeleton/Skeleton'

const Feed = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  const userload = useSelector((state) => state.user)


  const logout = async () => {
    await signOut(auth)
    dispatch(setUser({ email: '', uid: '' }))
    navigate('/login')
  }

  const [totalCount, setCount] = useState(0)
  const [allPitches, setAllPitches] = useState([]);
  const [pitchLoading, setPitchLoading] = useState(true);

  // console.log(totalCount);
  const [pageNumber, setPageNumber] = useState(0);


  const fetchLimitedPitch = async () => {
    const page = pageNumber + 1;
    setPageNumber(page);
    await axios.get(`https://shart-tank.vercel.app/pitchlimit?limit=3&skip=${(page - 1) * 3}`)
      .then((res) => {
        setAllPitches([...allPitches, ...res.data]);
        setPitchLoading(false);
      })
      .catch(() => {
        console.log('something wrong in fetching pitches');
      })
  }

  useEffect(() => {
    axios.get(`https://shart-tank.vercel.app/totalpitches`).then((res) => {
      setCount(res.data.totalpitches)
      fetchLimitedPitch()
    })
  }, [])


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
                <Pitchmachine setAllPitches={setAllPitches} setCount={setCount} />
              </div>
            </div>
          )}

          <div className="feed_pitches">
            {userload.loading ? <Skeleton />

              :

              !pitchLoading &&
              <InfiniteScroll
                dataLength={allPitches.length}
                next={fetchLimitedPitch}
                hasMore={!(totalCount === allPitches.length)}
                loader={<Skeleton />}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }

              >
                <div className="fix_to_center">
                  {
                    allPitches.map((pitch) => (
                      <Pitch key={pitch._id} pitchData={pitch} />
                    ))
                  }
                </div>
              </InfiniteScroll>
            }
          </div>
        </div>
        <FollowNow />
      </div>
    </>
  )
}

export default React.memo(Feed)
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const UserList = ({ data }) => {
  const userload = useSelector((state) => state.user)

  const [isfollow, setFollow] = useState(false)

  const followNow = async () => {
    const details = {
      userId: data._id,
      followerId: userload.users._id,
      followerName: userload.users.name,
      follwerAvatar: userload.users.avatar,
    }

    await axios
      .post(`https://shart-tank.vercel.app/user/follow`, details)
      .then((res) => {
        setFollow(true)
        toast.success('Wow, you are connected', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch((e) => {
        toast.error('Something while following', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })

    const message = {
      userId: data._id,
      messagerId: userload.users._id,
      messagerName: userload.users.name,
      messagerAvatar: userload.users.avatar,
      pitchId: 'followed you',
    }

    await axios
      .post(`https://shart-tank.vercel.app/user/notify`, message)
      .then(() => {
        toast.success('message sent to entrepreneur', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch((e) => {
        toast.error('Message not sent', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
  }

  const checkfollow = () => {
    for (let i = 0; i < data.followers.length; i++) {
      const user = data.followers[i]
      if (user.followerId === userload.users._id) {
        return true
      }
    }
    return false
  }

  const navigate = useNavigate()

  const showProfile = () => {
    navigate(`/profile/${data._id}`)
  }

  return (
    <>
      <ToastContainer />
      <div className="user_recommend_box">
        <div className="user_recommend">
          <img
            src={data.avatar}
            width="50px"
            height="50px"
            alt="DP"
            onClick={showProfile}
          />
          <p>{data.name}</p>
        </div>
        <div className="user_recommend_btn">
          {!userload.loading && !checkfollow() && !isfollow ? (
            <button onClick={followNow}>follow</button>
          ) : (
            <button id="followed_btn">following</button>
          )}
        </div>
      </div>
    </>
  )
}

export default UserList

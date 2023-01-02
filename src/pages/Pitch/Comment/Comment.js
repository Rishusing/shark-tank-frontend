import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './Comment.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Comment = ({ pitchID, setTotalComment }) => {
  const [comments, setComments] = useState([])
  const [inpcomment, setInpcomment] = useState('')
  const me = useSelector((state) => state.user.users)

  useEffect(() => {
    axios
      .get(`https://shart-tank.vercel.app/findcomment/${pitchID}`)
      .then((res) => {
        // const
        const newData = res.data.reverse()
        setComments(newData)
      })
      .catch(() => {
        toast.error('something wrong while commenting', {
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
  }, [])

  const postComment = () => {
    const newComment = {
      pitchId: pitchID,
      userId: me._id,
      name: me.name,
      avatar: me.avatar,
      commentText: inpcomment,
    }
    axios
      .post(`https://shart-tank.vercel.app/pitches/comment`, newComment)
      .then((res) => {
        const newData = res.data.reverse()
        setComments(newData)
        setTotalComment((prev) => prev + 1)
      })
      .catch(() => {
        toast.error('something wrong while commenting', {
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

  return (
    <>
      <ToastContainer />
      <div className="commentField">
        <input
          type="text"
          className="commentInput"
          placeholder="Comment Here"
          onChange={(e) => setInpcomment(e.target.value)}
        />
        <button onClick={postComment}>POST</button>
      </div>
      {comments.length &&
        comments.map((comment) => (
          <div className="each_offer" key={comment._id}>
            <div className="each_offer_img">
              <img src={comment.avatar} alt="IMG" width="50px" height="50px" />
            </div>
            <div className="each_offer_detail_box">
              <div className="each_offer_profile">
                <p className="name">
                  {comment.name}{' '}
                  <span>{timeAgo.format(new Date(comment.date))}</span>
                </p>
              </div>
              <div className="each_offer_detail">
                <div className="asItis">
                  <p>{comment.commentText}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}

export default React.memo(Comment)
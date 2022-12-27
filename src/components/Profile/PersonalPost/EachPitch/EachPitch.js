import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BiRupee } from 'react-icons/bi'
import { RiPercentFill } from 'react-icons/ri'
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from 'react-icons/bs'
import { MdLocalOffer } from 'react-icons/md'
import { RiSendPlaneFill, RiMessage2Fill } from 'react-icons/ri'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Offers from '../../../../pages/Pitch/Offers/Offers'
import Comment from '../../../../pages/Pitch/Comment/Comment'
import Postoffer from '../../../../pages/Pitch/PostOffer/Postoffer'
import { useSelector } from 'react-redux'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const EachPitch = ({ pitchData }) => {
  const checkuserType = useSelector((state) => state.user)

  const time_ago = timeAgo.format(new Date(pitchData.createdAt))
  const [offerflag, setOfferFlag] = useState(false)
  const [commentflag, setCommentFlag] = useState(false)
  const [postOfferflag, setPostOfferFlag] = useState(false)

  const [isliked, setIsliked] = useState(false)
  const [totallike, setTotallike] = useState(pitchData.likes.length)
  const [totalComment, setTotalComment] = useState(pitchData.comments.length)

  useEffect(() => {
    pitchData.likes.forEach((like) => {
      if (like.likerId === checkuserType.users._id) {
        return setIsliked(true)
      }
    })
  }, [])

  const openOffer = () => {
    setOfferFlag(!offerflag)
    setCommentFlag(false)
    setPostOfferFlag(false)
  }

  const openComment = () => {
    setOfferFlag(false)
    setPostOfferFlag(false)
    setCommentFlag(!commentflag)
  }

  const postOffer = () => {
    setOfferFlag(false)
    setCommentFlag(false)
    setPostOfferFlag(!postOfferflag)
  }

  const likePitch = () => {
    setIsliked(true)
    setTotallike(totallike + 1)
    const likeObj = { pitchId: pitchData._id, likerId: checkuserType.users._id }
    axios
      .post(`https://shart-tank.vercel.app/pitches/like`, likeObj)
      .then(() => {
        setTotallike(totallike + 1)
      })
  }

  return (
    <>
      <div className="pitch_main">
        <div className="pitch_top">
          <h5 id="timeAgo">{time_ago}</h5>
          <div className="pitch_top_pitchTitle">
            <p>Pitch Title : {pitchData.pitchTitle} </p>
          </div>
          <div className="pitch_top_pitchIdea">
            <p>Pitch Idea : {pitchData.pitchIdea} </p>
          </div>
          <div className="pitch_top_amount">
            <div className="pitch_amount">
              <BiRupee />
              <p> Amount : {pitchData.askAmount}</p>
            </div>
            <div className="pitch_equity">
              <RiPercentFill />
              <p>Equity: {pitchData.equity}</p>
            </div>
          </div>
          <div className="pitch_top_image">
            <img src={pitchData.pitchImage} alt="" />
          </div>
        </div>
        <div className="pitch_bottom">
          <div className="pitch_bottom_likes">
            {isliked ? (
              <div className="pitch_bottom_likes">
                <BsFillHandThumbsUpFill />
                <span>
                  {totallike} <p>likes</p>
                </span>
              </div>
            ) : (
              <div className="pitch_bottom_likes">
                <BsHandThumbsUp onClick={likePitch} />
                <span>
                  {totallike} <p>likes</p>
                </span>
              </div>
            )}
          </div>
          <div className="pitch_bottom_offers" onClick={openComment}>
            <RiMessage2Fill />
            <span>
              {totalComment} <p>comments</p>
            </span>
          </div>
          <div className="pitch_bottom_offers" onClick={openOffer}>
            <MdLocalOffer />
            <span>
              {pitchData.offers.length} <p>offers</p>
            </span>
          </div>
          {!checkuserType.loading &&
            checkuserType.users.profile === 'investor' && (
              <div className="pitch_bottom_postOffer" onClick={postOffer}>
                <RiSendPlaneFill /> <span>Post a offer</span>
              </div>
            )}
        </div>
        {offerflag && <Offers pitchID={pitchData._id} />}
        {commentflag && (
          <Comment
            commentsData={pitchData.comments}
            pitchID={pitchData._id}
            setTotalComment={setTotalComment}
          />
        )}
        {postOfferflag && <Postoffer pitchID={pitchData._id} />}
      </div>
    </>
  )
}

export default EachPitch

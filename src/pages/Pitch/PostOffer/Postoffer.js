import React, { useState } from 'react'
import './Postoffer.css'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'

import { fetchOffer } from '../../../redux/slice/offerSlice'
import { useNavigate } from 'react-router-dom'

const Postoffer = (props) => {
  const pitchID = props.pitchID
  const entrepreneurId = props.entrepreneurId
  const setTotalOffer = props.setTotalOffer
  const navigate = useNavigate()

  const [bid, setBid] = useState({ amount: "", equity: "", suggestion: "" });

  const handleBidChange = (e) => {
    setBid({ ...bid, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const me = useSelector((state) => state.user.users)

  const postOffer = async () => {
    if (bid.amount === '' || bid.equity === '' || bid.suggestion === '') {
      return toast.error('Please select all three fields', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }

    const newOffer = {
      pitchId: pitchID,
      investorId: me._id,
      investorName: me.name,
      avatar: me.avatar,
      amount: bid.amount,
      equity: bid.equity,
      comment: bid.suggestion,
    }

    // console.log(newOffer);

    await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/pitches/offer`, newOffer)
      .then(() => {
        dispatch(
          fetchOffer(`${process.env.REACT_APP_BASE_API_URL}/findoffers/${pitchID}`),
        )
        setBid({ amount: "", equity: "", suggestion: "" });
        setTotalOffer((prev) => prev + 1)

        toast.success('offer is posted', {
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
      .catch(() => {
        toast.error('something wrong while posting offer', {
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

    const message = {
      userId: entrepreneurId,
      messagerId: me._id,
      messagerName: me.name,
      messagerAvatar: me.avatar,
      pitchId: pitchID,
    }

    await axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/user/notify`, message)
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

    navigate('/feed')
  }

  return (
    <>
      <ToastContainer />

      <div className="postOfferField">
        <div className="offerAmountEquity">
          <input
            type="text"
            name="amount"
            className="postOfferInput"
            placeholder="Amount In Rupees"
            onChange={handleBidChange}
            value={bid.amount}
          />
          <input
            type="text"
            name="equity"
            className="postOfferInput"
            placeholder="Equity"
            onChange={handleBidChange}
            value={bid.equity}
          />
        </div>
        <div className="postSuggestion">
          <input
            type="text"
            name="suggestion"
            className="postOffer"
            placeholder="Suggestion"
            onChange={handleBidChange}
            value={bid.suggestion}
          />
          <button onClick={postOffer}>POST</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(Postoffer)

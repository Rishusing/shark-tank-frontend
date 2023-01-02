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
  // console.log(pitchID);
  // console.log(entrepreneurId);

  const [amount, setAmount] = useState('')
  const [equity, setEquity] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const dispatch = useDispatch()
  const me = useSelector((state) => state.user.users)

  const postOffer = async () => {
    if (amount === '' || equity === '' || suggestion === '') {
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
      amount,
      equity,
      comment: suggestion,
    }

    // console.log(newOffer);

    await axios
      .post(`https://shart-tank.vercel.app/pitches/offer`, newOffer)
      .then(() => {
        dispatch(
          fetchOffer(`https://shart-tank.vercel.app/findoffers/${pitchID}`),
        )
        setSuggestion('')
        setAmount('')
        setEquity('')
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

    navigate('/feed')
  }

  return (
    <>
      <ToastContainer />

      <div className="postOfferField">
        <div className="offerAmountEquity">
          <input
            type="text"
            className="postOfferInput"
            placeholder="Amount In Rupees"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <input
            type="text"
            className="postOfferInput"
            placeholder="Equity"
            onChange={(e) => setEquity(e.target.value)}
            value={equity}
          />
        </div>
        <div className="postSuggestion">
          <input
            type="text"
            className="postOffer"
            placeholder="Suggestion"
            onChange={(e) => setSuggestion(e.target.value)}
            value={suggestion}
          />
          <button onClick={postOffer}>POST</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(Postoffer)

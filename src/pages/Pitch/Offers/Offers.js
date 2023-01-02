import React, { useEffect } from 'react'
import Eachoffer from '../EachOffer/Eachoffer'
import './Offers.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOffer } from '../../../redux/slice/offerSlice'

const Offers = ({ pitchID }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOffer(`https://shart-tank.vercel.app/findoffers/${pitchID}`))
  }, [dispatch, pitchID])

  const allOffers = useSelector((state) => state.offer)

  return (
    <div className="pitch_offer_box">
      {!allOffers.loading &&
        allOffers.offer.map((offer) => (
          <Eachoffer key={offer._id} offerData={offer} />
        ))}
    </div>
  )
}

export default React.memo(Offers)

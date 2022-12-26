import React from 'react'
// import './Eachoffer.css'
import {BiRupee} from 'react-icons/bi'
import { RiPercentFill } from 'react-icons/ri'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Eachoffer = ({ offerData }) => {
    
    return (
        <>
            <div className="each_offer">
                <div className='each_offer_img'>
                    <img src={offerData.avatar} alt='IMG' width='50px' height='50px' />
                </div>
                <div className="each_offer_detail_box">
                    <div className="each_offer_profile">
                        <p className='name'>{offerData.investorName} <span>{ timeAgo.format(new Date(offerData.date))}</span></p>
                        <p className='name_type'>Investor</p>
                    </div>
                    <div className="each_offer_detail">
                        <div className='asItis'>
                            <p>Hi there, I am looking to invest with below details.</p>
                        </div>
                        <div className="amount_equity">
                            <p><BiRupee  /> {offerData.amount}</p>
                            <p><RiPercentFill />{offerData.equity}</p>
                        </div>
                        <div className="commentBtInvestor">
                            <p> {offerData.comment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Eachoffer
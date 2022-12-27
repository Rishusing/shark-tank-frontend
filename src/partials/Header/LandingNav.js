import React from 'react'
import './Navbar.css'
import { BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs'

import logo from './shark-tank-logo.png'
import { useNavigate } from 'react-router-dom'

const LandingNav = () => {

    const navigate = useNavigate()

    const GotoFeedPage = () => {
        navigate('/feed')
    }

    return (
        <div className='nav_main'>
            <div className="nav_left">
                <img src={logo} alt="SHARK TANK" height="100%" />
            </div>
            <div className="nav_middle">

                <div className="nav_mid_child nav_twitter">
                    <BsTwitter />
                </div>
                <div className="nav_mid_child nav_facebook">
                    <BsFacebook />
                </div>
                <div className="nav_mid_child nav_insta">
                    <BsInstagram />
                </div>
                
            </div>
            <div className="nav_right">
                <button className='nav_btn' onClick={GotoFeedPage}>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default LandingNav
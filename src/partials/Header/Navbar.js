import React from 'react'
import './Navbar.css'
import { BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs'
import { VscBellDot } from 'react-icons/vsc'
import logo from './shark-tank-logo.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/feed')
    }
    
    const userload = useSelector(state => state.user);

    const showNotifications = () => {
        navigate(`/notifications/${userload.users._id}`)
    }

    

    return (
        <div className='nav_main'>
            <div className="nav_left">
                <img src={logo} alt="SHARK TANK" height="100%" onClick={gotoHome} />
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
            {
                !(userload.loading) &&

                <div className="nav_notify">
                    <VscBellDot onClick={showNotifications} />
                    <span>notifications</span>
                </div>
            }
            <div className="nav_right">
                <button className='nav_btn'>
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Navbar
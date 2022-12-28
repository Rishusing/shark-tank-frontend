import React from 'react'
import LandingNav from './partials/Header/LandingNav'
import Footer from './partials/Footer/Footer';
import './LandingPage.css'
import {FaArrowCircleRight} from 'react-icons/fa'


const LandingPage = () => {

    return (
        <div className='landing-page-main'>
            <LandingNav />
            <div className='landingpage_main'>
                <div className="landingpage_left">
                    <div className='landingpage_left_top'>
                        <div className="left1 left_top">
                            <p>WHAT TO SCALE UP</p>
                        </div>
                        <div className="left2 left_top">
                            <p>YOUR BUSINESS</p>
                        </div>
                        <div className="left3 left_top">
                            <p>BUT NO ONE BELIEVES</p>
                        </div>
                        <div className="left4 left_top">
                            IN YOU VISION?
                        </div>
                    </div>
                    <div className='landingpage_left_bottom'>
                        <div className="left_bottom">
                            <FaArrowCircleRight />
                            <p>NOW, PITCH IT TO RIGHT PEOPLE!</p>
                        </div>
                    </div>
                </div>
                <div className="landingpage_middle">
                    <div className="middle1 middlechild">
                        <p>BE WHERE</p>
                    </div>
                    <div className="middle2 middlechild">
                        <p>YOU BELONG</p>
                    </div>
                    <div className="middle3 middlechild">
                        <p>BE WHERE</p>
                    </div>
                    <div className="middle4 middlechild">
                        <p>YOUR IDEAS</p>
                    </div>
                    <div className="middle5 middlechild">
                        <p>GET WINGS</p>
                    </div>
                </div>
                <div className="landingpage_right">
                    <div className="right1 right">
                        <div className="right1_left">
                            <p>Register/SignUp for Investor/Entrepreneur</p>
                        </div>
                        <div className="right1_right">
                            <p>STEP1</p>
                        </div>
                    </div>
                    <div className="right2 right">
                        <div className="right2_left">
                            <p>STEP2</p>
                        </div>
                        <div className="right2_right">
                            <p>Create your profile/Enter you personal details</p>
                        </div>
                    </div>
                    <div className="right3 right">
                        <div className="right1_left">
                            <p>Tell us about your business idea venture in detail</p>
                        </div>
                        <div className="right1_right">
                            <p>STEP3</p>
                        </div>
                    </div>
                    <div className="right4 right">
                        <div className="right2_left">
                            <p>STEP4</p>
                        </div>
                        <div className="right2_right">
                            <p>Share your expectations in terms of investment</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage
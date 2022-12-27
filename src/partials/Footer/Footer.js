import React from 'react'
import './Footer.css'
import {CiMail, CiLinkedin} from 'react-icons/ci'
import { VscGithubAlt } from 'react-icons/vsc'


const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer-distributed">
            <div className="footer-top">
                <div className="footer-top-left">
                    <CiMail />
                    <p>helpdesk@sharktank.com</p>
                </div>
                <div className="footer-top-middle">
                    <VscGithubAlt />
                    <a href='https://github.com/Rishusing' target="_blank" rel="noreferrer">GitHub</a>
                    
                </div>
                <div className="footer-top-right">
                    <CiLinkedin />
                    <a href='https://www.linkedin.com/in/rishu-profile/' target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyright &#169; {currentYear} Shark Tank</p>
            </div>
        </footer>
    )
}

export default Footer
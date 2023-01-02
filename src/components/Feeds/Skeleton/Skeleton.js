import React from 'react'
import './Skeleton.css'

const Skeleton = () => {
  return (
    <div className="skcard">
      <div className="header">
        <div className="img"></div>
        <div className="details">
          <span className="name"></span>
          <span className="about"></span>
        </div>
      </div>
      <div className="content">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line line-3"></div>
      </div>
      <div className="btns">
        <div className="btnch btn-1"></div>
      </div>
    </div>
  )
}

export default Skeleton
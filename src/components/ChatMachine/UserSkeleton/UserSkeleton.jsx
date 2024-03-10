import React from 'react'
import './UserSkeleton.css'

const UserSkeleton = () => {
    return (
        <div className="skeleton">
            <div className="skeleton-left flex1">
                <div className="square circle"></div>
            </div>
            <div className="skeleton-right flex2">
                <div className="line"></div>
                <div className="line  w75"></div>
            </div>
        </div>

    )
}

export default UserSkeleton
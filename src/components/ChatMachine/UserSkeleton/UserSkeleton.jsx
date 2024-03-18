import React from 'react'
import './UserSkeleton.css'

const UserSkeleton = ({ class_name_prefix }) => {
    return (
        <div className={`${class_name_prefix}_skeleton`}>
            <div className={`${class_name_prefix}_skeleton-left ${class_name_prefix}_flex1`}>
                <div className={`${class_name_prefix}_square ${class_name_prefix}_circle`}></div>
            </div>
            <div className={`${class_name_prefix}_skeleton-right ${class_name_prefix}_flex2`}>
                <div className={`${class_name_prefix}_line`}></div>
                <div className={`${class_name_prefix}_line ${class_name_prefix}_ w75`}></div>
            </div>
        </div>

    )
}

export default UserSkeleton
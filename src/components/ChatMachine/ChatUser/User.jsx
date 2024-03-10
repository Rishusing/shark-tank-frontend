import React from 'react'
import './User.css'

const User = ({ on_select, userDetail, selectedUserId }) => {
    // console.log(userDetail);

    return (
        <div className={`chatuser_main_container ${selectedUserId === userDetail._id ? 'selected_chat_user' : 'nonselected_chat_user'} `} onClick={() => on_select(userDetail._id)}>
            <div className='chat_user_avatar'>
                <img src={userDetail.avatar} alt="" height='60px' width='60px' />
            </div>
            <div className='chat_user_name'>
                <h3>{userDetail.name}</h3>
                <p>{userDetail.companyname}</p>
            </div>
        </div>
    )
}

export default React.memo(User)
import React from 'react'
import './Followers.css'
import { CgCloseO } from 'react-icons/cg'
import {useNavigate} from 'react-router-dom'

const Followers = (props) => {
    
    const navigate = useNavigate()

    const handleClick = () => {
        props.setOpen(false)
    }

    const showProfile = (userID) => {
        navigate(`/profile/${userID}`)
    }

    return (
        <div className='follower_main'>
            <div className="follower_top">
                <CgCloseO onClick={handleClick} />
            </div>
            <div className="follower_buttom">
                {
                    props.followers.map((user) =>
                        <div className='each_followers' key={user.followerId}>
                            <img src={user.follwerAvatar} alt="DP" height='55px' width='55px' onClick={() => showProfile(user.followerId)} />
                            <p>{user.followerName}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Followers
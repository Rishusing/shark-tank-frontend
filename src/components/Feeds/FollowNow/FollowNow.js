import React from 'react'
import { useSelector } from 'react-redux'
import UserList from '../Userlist/UserList'


const FollowNow = () => {

    const Users = useSelector((state) => state.alluser)
    
    return (
        <>
            <div className="feed_right">
                {!(Users.loading)
                    &&
                    <div className="feed_right_users">
                        {
                            Users.alluser.map(user => <UserList key={user._id} data={user} />)
                        }
                    </div>
                    
                }
            </div>
        </>
    )
}

export default FollowNow
import React, { useEffect, useState } from 'react'
import './SideBar.css'
import User from '../ChatUser/User'
import axios from 'axios'
import UserSkeleton from '../UserSkeleton/UserSkeleton'

const SideBar = ({ on_select, own_id, selectedUserId }) => {

    const [subuser, setSubUser] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [skeletonflag, setSkeletonflag] = useState(false)
    const [pinnedUser, setPinnedUser] = useState([])
    const [pinnedUserDetail, setPinnedUserDetail] = useState([])
    // console.log(own_id);

    const fetchUserDetails = async (userIds) => {
        try {
            const userDetailsPromises = userIds.map(userId => {
                return axios.get(`https://shart-tank.vercel.app/custom_user/${userId.userId2 !== own_id ? userId.userId2 : userId.userId1}`).then(response => response.data);
            });

            const userDetails = await Promise.all(userDetailsPromises);
            // console.log('zxz');
            setPinnedUserDetail(userDetails)

        } catch (error) {
            console.error('Error fetching user details:', error);

        }
    };

    useEffect(() => {

        const getChatUsers = async (pinneduser) => {
            const idsPinneduser = pinneduser.map(user => (user.userId2 !== own_id) ? user.userId2 : user.userId1);

            // console.log(idsPinneduser);
            const searchedUser = await axios.get(`https://shart-tank.vercel.app/finduser/${subuser.trim()}`);
            const filteredSearchedUser = searchedUser.data.filter(item => !idsPinneduser.includes(item._id) && item._id !== own_id);
            setSearchUsers(filteredSearchedUser)
            setSkeletonflag(false);
        }

        const getPinnedUser = async () => {
            const userspinned = await axios.get(`https://shart-tank.vercel.app/chat_list/${own_id}`)
            fetchUserDetails(userspinned.data);
            setPinnedUser(userspinned.data)

            if (subuser.trim() !== '') {
                setSkeletonflag(true);
                getChatUsers(userspinned.data)
            }
            else {
                setSearchUsers([])
            }
        }
        getPinnedUser();
    }, [subuser])



    const handleInputChange = (event) => {
        setSubUser(event.target.value);
    };

    // Define a function to handle the debouncing
    const debounce = (func, delay) => {

        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const debouncedHandleInputChange = debounce(handleInputChange, 500); // Adjust the delay time as needed


    const addToChatList = async (_id) => {
        try {
            const res = await axios.post('https://shart-tank.vercel.app/newconversation', { userId1: own_id, userId2: _id })
            // console.log(res.data);
            fetchUserDetails([...pinnedUser, res.data]);
            setPinnedUser(prv => [...prv, res.data])
            setSearchUsers([])
            // on_select(res.data.userId2)
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='main_sidebar_container'>

            <div className='search_chat_user'>
                <div className='chatsearchBox'>
                    <input type="text" onChange={debouncedHandleInputChange} placeholder='Search by name...' />
                </div>

                {
                    skeletonflag ?
                        <>
                            <UserSkeleton />
                            <UserSkeleton />
                            <UserSkeleton />
                            <UserSkeleton />
                            <UserSkeleton />
                        </>
                        :
                        <div className='searchedChatUsersBox'>
                            {
                                searchUsers.map((user) =>
                                    <div className='searchedChatUser' key={user._id} onClick={() => addToChatList(user._id)}>
                                        <div className='bx1'>
                                            <img src={user.avatar} alt="AV" width="45px" height="45px" />
                                        </div>
                                        <div className='bx2'>
                                            <p className='name'>{user.name}</p>
                                            <p className='cmpnyname'>{user.companyname}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }

            </div>

            {
                pinnedUserDetail.map((user) => <User selectedUserId={selectedUserId} key={user._id} userDetail={user} on_select={on_select} />)
            }
        </div>
    )
}

export default React.memo(SideBar)
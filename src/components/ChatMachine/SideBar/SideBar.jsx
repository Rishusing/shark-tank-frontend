import React, { useEffect, useState } from 'react'
import './SideBar.css'
import User from '../ChatUser/User'
import axios from 'axios'
import UserSkeleton from '../UserSkeleton/UserSkeleton'
import { useSelector, useDispatch } from 'react-redux'
import { fetchChatListUsersDetail } from '../../../redux/slice/chat_list_users_detailSlice'

const SideBar = ({ on_select, own_id, selectedUserId }) => {

    const [subuser, setSubUser] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [skeletonflag, setSkeletonflag] = useState(false)
    // const [pinnedUser, setPinnedUser] = useState([])
    // console.log(own_id);

    const userspinned = useSelector((state) => state.conversations)
    const userDetails = useSelector((state) => state.chat_list_users)
    const dispatch = useDispatch();
    const fetchUserDetails = async (userIds) => {
        try {
            dispatch(fetchChatListUsersDetail({ url: 'https://shart-tank.vercel.app/custom_user', userIds, own_id }))
        } catch (error) {
            console.error('Error fetching user details:', error);

        }
    };

    useEffect(() => {

        const getChatUsers = async (pinneduser) => {
            const idsPinneduser = pinneduser.map(user => (user.userId2 !== own_id) ? user.userId2 : user.userId1);
            const searchedUser = await axios.get(`https://shart-tank.vercel.app/finduser/${subuser.trim()}`);
            const filteredSearchedUser = searchedUser.data.filter(item => !idsPinneduser.includes(item._id) && item._id !== own_id);
            setSearchUsers(filteredSearchedUser)
            setSkeletonflag(false);
        }

        const getPinnedUser = async () => {

            if (subuser.trim() !== '') {
                setSkeletonflag(true);
                getChatUsers(userspinned.conversations)
            }
            else {
                setSearchUsers([])
            }
        }
        getPinnedUser();
    }, [subuser])

    useEffect(() => {
        fetchUserDetails(userspinned.conversations);
    }, [userspinned.conversations])



    const handleInputChange = (event) => {
        setSubUser(event.target.value);
    };

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

            console.log([...userspinned.conversations, res.data]);
            fetchUserDetails([...userspinned.conversations, res.data]);

            setSearchUsers([])

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
                userDetails.chatusersdetail.map((user) => <User selectedUserId={selectedUserId} key={user._id} userDetail={user} on_select={on_select} />)
            }
        </div>
    )
}

export default React.memo(SideBar)
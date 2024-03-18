import React, { useState, useEffect } from 'react'
import SideBar from '../SideBar/SideBar'
import MessageBox from '../MessageBox/MessageBox'
import './MainBoard.css'

import chatPoster from './chatPoster1.svg'
import Navbar from '../../../partials/Header/Navbar';

import { useParams } from 'react-router-dom'


const MainBoard = () => {

    const { id: userId } = useParams()

    const [selectedUser, setSelectedUser] = useState(null);

    const OnSelect = (userDetail) => {
        // console.log(userDetail);
        setSelectedUser(userDetail)
    }



    return (
        <>
            <Navbar />
            <div className='chat_main_container'>
                <div className="chat_main_child">
                    <SideBar on_select={OnSelect} own_id={userId} selectedUserId={selectedUser} />
                    {selectedUser ? <MessageBox own_id={userId} /> : <img src={chatPoster} className='chatPoster' width="30%" height='30%' />}
                </div>
            </div>
        </>
    )
}

export default React.memo(MainBoard)
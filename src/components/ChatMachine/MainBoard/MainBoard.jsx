import React, { useState, useEffect } from 'react'
import SideBar from '../SideBar/SideBar'
import MessageBox from '../MessageBox/MessageBox'
import './MainBoard.css'
import io from 'socket.io-client';
import Navbar from '../../../partials/Header/Navbar';

import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';


const socket = io(`${process.env.REACT_APP_BASE_API_URL}`);

const MainBoard = () => {

    const { id: userId } = useParams()

    const [selectedUser, setSelectedUser] = useState(null);

    const OnSelect = (userDetail) => {
        // console.log(userDetail);
        setSelectedUser(userDetail)
    }

    const [userschat, setUserChat] = useState({});

    const updateChats = (key, value) => {
        setUserChat(prevState => ({
            ...prevState,
            [key]: [...(prevState[key] || []), value]
        }));
    };

    const addInChats = (text) => {
        updateChats(selectedUser._id, { id: uuidv4(), text, own: true });
    };


    const handleMessageReceive = (payload) => {
        console.log(payload);
        updateChats(payload.senderId, { id: uuidv4(), text: payload.text, own: false });
    }

    useEffect(() => {
        socket.on(userId, handleMessageReceive);
        return () => {
            socket.off(userId, handleMessageReceive);
        };
    })


    return (
        <>
            <Navbar />
            <div className='chat_main_container'>
                <div className="chat_main_child">
                    <SideBar on_select={OnSelect} own_id={userId} selectedUserId={selectedUser} />
                    {selectedUser && <MessageBox chats={userschat[selectedUser] || []} addInChats={addInChats} own_id={userId} />}
                </div>
            </div>
        </>
    )
}

export default React.memo(MainBoard)
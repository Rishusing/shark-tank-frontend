import React, { useEffect, useRef, useState } from 'react'
import './MessageBox.css'
import io from 'socket.io-client';
import { MdSend } from "react-icons/md";
import { useSelector } from 'react-redux'

const socket = io('REACT_APP_BASE_API_URL');



const MessageBox = ({ chats, addInChats, own_id }) => {


    const selectedUserState = useSelector(state => state.selectedUser);

    const autoScrollRef = useRef(null);

    useEffect(() => {

        if (autoScrollRef.current) {
            autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
        }

    }, [chats])

    const [text, setText] = useState('');

    const sendMessage = (e) => {

        e.preventDefault()
        if (text.trim() !== '') {
            e.preventDefault();
            const payload = { text, receiverId: 'ds', senderId: own_id }
            // console.log(payload);
            addInChats(text)
            setText('')
            socket.emit('sendMessage', payload)
        }
    }

    return (
        <>
            {
                selectedUserState.userExist && <div className='main_msg_container'>
                    <div className="chat_header">
                        <div className='chat_header_user_avatar'>
                            <img src={selectedUserState.selectedUser.avatar} alt="" width='60px' height='60px' />
                        </div>
                        <div className="chat_header_user_name">
                            <h4>{selectedUserState.selectedUser.name}</h4>
                            <p>{selectedUserState.selectedUser.profile}</p>
                        </div>
                    </div>
                    <div className="main_chat_box" ref={autoScrollRef}>

                        {
                            chats.map((chat) => {
                                return (
                                    <div key={chat.id} className={chat.own ? 'message sender' : 'message receiver'}>
                                        <p>{chat.text}</p>
                                    </div>
                                )
                            })
                        }


                    </div>
                    <form className="chat_form" onSubmit={sendMessage}>
                        <input type="text" value={text} className='inp' onChange={(e) => setText(e.target.value)} />
                        <button><MdSend /></button>
                    </form>
                </div>
            }
        </>
    )
}

export default React.memo(MessageBox)
import React, { useEffect, useRef, useState } from 'react'
import './MessageBox.css'
import io from 'socket.io-client';
import { MdSend } from "react-icons/md";
import axios from 'axios';

const socket = io('https://shart-tank.vercel.app/');



const MessageBox = ({ chats, addInChats, own_id, selectedUserId }) => {

    // console.log(chats);

    const autoScrollRef = useRef(null);

    useEffect(() => {

        if (autoScrollRef.current) {
            autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
        }

    }, [chats])

    const [text, setText] = useState('');
    const [selectedUserDetail, setSelectedUserDetail] = useState(null)

    const sendMessage = (e) => {

        e.preventDefault()
        if (text.trim() !== '') {
            e.preventDefault();
            const payload = { text, receiverId: selectedUserId, senderId: own_id }
            // console.log(payload);
            addInChats(text)
            setText('')
            socket.emit('sendMessage', payload)
        }
    }

    useEffect(() => {

        const GD = async () => {
            const userD = await axios.get(`https://shart-tank.vercel.app/custom_user/${selectedUserId}`)
            setSelectedUserDetail(userD.data)
        }

        GD()

    })



    return (
        <>
            {
                selectedUserDetail && <div className='main_msg_container'>
                    <div className="chat_header">
                        <div className='chat_header_user_avatar'>
                            <img src={selectedUserDetail.avatar} alt="" width='60px' height='60px' />
                        </div>
                        <div className="chat_header_user_name">
                            <h4>{selectedUserDetail.name}</h4>
                            <p>{selectedUserDetail.profile}</p>
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
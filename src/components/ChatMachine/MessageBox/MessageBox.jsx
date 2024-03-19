import React, { useEffect, useRef, useState } from 'react'
import './MessageBox.css'
import io from 'socket.io-client';
import { MdSend } from "react-icons/md";
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { BsEmojiSmileFill } from "react-icons/bs";
import { CgCloseO } from 'react-icons/cg'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Popup from 'reactjs-popup'
import { format, parseISO } from 'date-fns';


const MessageBox = ({ own_id }) => {

    var socket;

    const [chats, setChats] = useState([]);
    const [text, setText] = useState('');
    const [open1, setOpen1] = useState(false)
    const closeModal1 = () => setOpen1(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);


    const handleEmojiClick = (e, emojiData) => {
        let sym = e.unified.split("-");
        const codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        const emoji = String.fromCodePoint(...codesArray);


        const input = document.getElementById('msg_inputField');
        const { selectionStart, selectionEnd } = input;

        const newValue =
            text.substring(0, selectionStart) +
            emoji +
            text.substring(selectionEnd);

        setText(newValue);

        const newCursorPosition = selectionStart + emoji.length;
        input.setSelectionRange(newCursorPosition, newCursorPosition);
        input.focus();

    };

    const selectedUserState = useSelector(state => state.selectedUser);

    const userPinned = useSelector(state => state.conversations);

    const conversationDetail = userPinned.conversations.find(pinneduser => (pinneduser.userId1 === selectedUserState.selectedUser._id || pinneduser.userId2 === selectedUserState.selectedUser._id));

    const autoScrollRef = useRef(null);

    useEffect(() => {

        if (autoScrollRef.current) {
            autoScrollRef.current.scrollTop = autoScrollRef.current.scrollHeight;
        }

    }, [chats])


    const handleMessageReceive = (payload) => {
        console.log(payload);
        setChats(prev => [...prev, { _id: uuidv4(), content: payload.content, senderId: payload.senderId, createdAt: new Date().toISOString().replace("Z", "+00:00") }])
        // updateChats(payload.senderId, { id: uuidv4(), text: payload.text, own: false });

    }

    useEffect(() => {
        setChats([]);
        const getChats = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/conversation/${conversationDetail._id}`)
                // console.log(res.data);
                setChats(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        getChats();
    }, [selectedUserState.selectedUser._id])

    useEffect(() => {
        socket = io(`http://localhost:8000/`);
        socket.on(own_id, handleMessageReceive);
        socket.on("check_typing" + own_id, (value) => {
            setIsTyping(true);
            const timer = setTimeout(() => {
                setIsTyping(false);
            }, 3000);

            return () => clearTimeout(timer);
        });

        return () => {
            socket.off(own_id, handleMessageReceive);
        };
    })

    const sendMessage = (e) => {

        e.preventDefault()
        if (text.trim() !== '') {
            e.preventDefault();
            const payload = { conversationId: conversationDetail._id, senderId: own_id, receiverId: selectedUserState.selectedUser._id, content: text }
            setChats(prev => [...prev, { _id: uuidv4(), content: text, senderId: own_id, createdAt: new Date().toISOString().replace("Z", "+00:00") }])
            setText('')
            socket.emit('sendMessage', payload)

        }
    }

    const formatDate = (dateString) => {
        const parsedDate = parseISO(dateString);
        return format(parsedDate, "dd MMM HH:mm");
    };


    const typingHandler = (e) => {
        setText(e.target.value);

        socket.emit("check_typing", { room: selectedUserState.selectedUser._id, istyping: true });

    };

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

                        <div className="main_chat_box1">
                            {
                                chats.map((chat) => {
                                    return (
                                        <div key={chat._id} className={chat.senderId === own_id ? 'message sender' : 'message receiver'}>
                                            <span>{chat.content} <p>{formatDate(chat.createdAt)}</p> </span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='main_chat_box2'>
                            {istyping && <p>Typing...</p>}
                        </div>
                    </div>

                    <div className="input-form-container">
                        <div className="emoji-button-container">
                            <div className="emoji">
                                <BsEmojiSmileFill onClick={() => setOpen1((o) => !o)} />

                                <Popup
                                    open={open1}
                                    closeOnDocumentClick
                                    onClose={closeModal1}
                                >
                                    <div className='emoji_pop_main'>
                                        <div className="emoji_pop_top">
                                            <CgCloseO onClick={() => setOpen1(!open1)} />
                                        </div>
                                        <Picker data={data} onEmojiSelect={handleEmojiClick} />
                                    </div>

                                </Popup>

                            </div>
                        </div>
                        <div className='input-form'>
                            <form className="chat_form" onSubmit={sendMessage}>
                                <input id='msg_inputField' type="text" placeholder='Type here 👉' value={text} className='inp' onChange={typingHandler} />
                                <button><MdSend /></button>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(MessageBox)
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { useNavigate } from 'react-router-dom'


TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const EachNotification = ({ noteData }) => {

    const time_ago = timeAgo.format(new Date(noteData.date))
    const navigate = useNavigate();
    const showProfile = () => {
        navigate(`/profile/${noteData.messagerId}`)
    }
    const showPitch = () => {
        navigate(`/singlepitch/${noteData.pitchId}`)
    }

    return (
        <>
            <div className='each_notification'>
                <div className="note_detail">
                    <img src={noteData.messagerAvatar} alt="" onClick={showProfile} />
                    {noteData.pitchId === 'followed you' ?
                        <p>{noteData.messagerName} started following you </p>
                        :
                        <p>{noteData.messagerName} <span onClick={showPitch}>offer on your pitch</span> </p>
                 }
                    
                </div>
                <div className="note_time_ago">
                    <p>{time_ago}</p>
                </div>
            </div>
        </>
    )
}

export default EachNotification
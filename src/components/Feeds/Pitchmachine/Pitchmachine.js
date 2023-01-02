import React, { useState } from 'react'
import { FcIdea } from 'react-icons/fc'
import { RiPercentLine } from 'react-icons/ri'
import { HiCurrencyRupee } from 'react-icons/hi2'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdSubtitles } from 'react-icons/md'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Resizer from 'react-image-file-resizer'
import Popup from 'reactjs-popup'

const Pitchmachine = ({ setAllPitches, setCount }) => {
  
  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)


  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64',
      )
    })

  const uploadAvatar = async (e) => {
    const file = e.target.files[0]
    const image = await resizeFile(file)
    setAvatar(image)
  }

  const entrepreneur = useSelector((state) => state.user.users)

  const [pitchImage, setAvatar] = useState(
    'https://cdn-icons-png.flaticon.com/512/2879/2879307.png',
  )

  const [pitchTitle, setTitle] = useState('')
  const [pitchIdea, setIdea] = useState('')
  const [askAmount, setAmount] = useState('')
  const [equity, setEquity] = useState('')

  const pitchHandler = (e) => {
    e.preventDefault()

    const pitch = {
      entrepreneurId: entrepreneur._id,
      entrepreneurName: entrepreneur.name,
      entrepreneurAvatar: entrepreneur.avatar,
      pitchTitle,
      pitchIdea,
      pitchImage,
      askAmount,
      equity,
    }

    if (
      pitchTitle === '' ||
      pitchIdea === '' ||
      pitchImage ===
        'https://cdn-icons-png.flaticon.com/512/2879/2879307.png' ||
      askAmount === '' ||
      equity === ''
    ) {
      return toast.error('All fields are mandatory', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }

    axios
      .post(`https://shart-tank.vercel.app/createpitch`, pitch)
      .then(() => {
        toast.success('Your pitch is posted', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        
        const addPitchOnTop = {_id : 'kjndjnjdasnjajkas728y7y8',createdAt:new Date(),likes:[], offers:[], comments:[], ...pitch};
        
        setAllPitches(prev => [addPitchOnTop,...prev])
        setCount(prev => prev + 1);
        setOpen(false)
      })
      .catch(() => {
        toast.error('Something wrong', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
  }

  return (
    <>
      <ToastContainer />
      <button className="feed_ask_btn" onClick={() => setOpen((o) => !o)}>
        Post Your Pitch
      </button>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="post_form">
          <div className="detail_right_buttom">
            <div className="upload">
              <img
                id="upload_photo"
                src={pitchImage}
                width="220px"
                height="200px"
                alt=""
              />
              <div className="round">
                <input type="file" accept="image/*" onChange={uploadAvatar} />
                <BsFillCameraFill />
              </div>
            </div>
            <div className="detail_input_field_post">
              <div className="detail_input_post">
                <MdSubtitles />
                <input
                  type="text"
                  required
                  placeholder="Pitch Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="detail_input_post">
                <FcIdea />
                <input
                  type="text"
                  required
                  placeholder="Pitch Idea"
                  onChange={(e) => setIdea(e.target.value)}
                />
              </div>
              <div className="detail_input_post">
                <HiCurrencyRupee />
                <input
                  type="text"
                  required
                  placeholder="Ask Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="detail_input_post">
                <RiPercentLine />
                <input
                  type="text"
                  required
                  placeholder="Equity"
                  onChange={(e) => setEquity(e.target.value)}
                />
              </div>

              <div className="detail_input_post">
                <button className="postbtn" onClick={pitchHandler}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  )
}

export default Pitchmachine

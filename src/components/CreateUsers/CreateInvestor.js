import React, { useState } from 'react'
import './Details.css'
import { BsFillCameraFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { RiProfileFill } from 'react-icons/ri'
import { ImProfile } from 'react-icons/im'
import { IoCallSharp } from 'react-icons/io5'
import { HiHomeModern } from 'react-icons/hi2'
import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../../redux/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreateInvestor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const authData = useSelector((state) => state.profile)

  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [companyname, setCompanyname] = useState('')

  const [avatar, setAvatar] = useState(
    'https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg',
  )

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        'JPEG',
        60,
        0,
        (uri) => {
          resolve(uri)
        },
        'base64',
      )
    })

  const uploadAvatar = async (event) => {
    try {
      const file = event.target.files[0]
      const image = await resizeFile(file)
      setAvatar(image)
    } catch (err) {
      console.log(err)
    }
  }

  const createProofile = async (e) => {
    e.preventDefault()
    const investor = {
      _id: authData.userId,
      email: authData.user,
      phone,
      name,
      companyname,
      avatar,
      profile: 'investor',
    }

    if (
      investor.phone === '' ||
      investor.name === '' ||
      investor.companyname === '' ||
      investor.avatar ===
        'https://www.silcharmunicipality.in/wp-content/uploads/2021/02/male-face.jpg'
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

    await axios
      .post(`https://shart-tank.vercel.app/createinvestor`, investor)
      .then((res) => {
        dispatch(
          fetchUser(`https://shart-tank.vercel.app/user/${res.data._id}`),
        )
        navigate('/feed')
      })
      .catch(() => {
        toast.error('Someting went wrong', {
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
      <div className="detail_main">
        <div className="detail_left_box">
          <div className="upload">
            <img src={avatar} width="180px" height="180px" alt="" />
            <div className="round">
              <input type="file" accept="image/*" onChange={uploadAvatar} />
              <BsFillCameraFill />
            </div>
          </div>

          <div className="detail_email">
            <h2>
              <MdEmail /> {authData.user}
            </h2>
            <h2>
              <ImProfile /> Investor
            </h2>
          </div>
        </div>
        <div className="detail_right_box">
          <div className="detail_right_top">
            <div className="user_type">
              <NavLink to="/create-entrepreneur" className="inactive">
                Entrepreneur
              </NavLink>
              <NavLink to="/create-investor" className="inactive">
                Investor
              </NavLink>
            </div>
          </div>
          <div className="detail_right_buttom">
            <div className="detail_input_field">
              <div className="detail_input">
                <RiProfileFill />
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="detail_input">
                <IoCallSharp />
                <input
                  type="text"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="detail_input">
                <HiHomeModern />
                <input
                  type="text"
                  placeholder="Company-name"
                  onChange={(e) => setCompanyname(e.target.value)}
                />
              </div>
              <div className="createProfileButton">
                <button onClick={createProofile}>Create Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateInvestor

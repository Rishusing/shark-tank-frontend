import React, { useEffect, useState } from 'react'
import './Profile.css'
import Navbar from '../../partials/Header/Navbar'
import { FaIndustry, FaEdit } from 'react-icons/fa'
import { AiFillProfile } from 'react-icons/ai'
import { MdPhone, MdEmail, MdSubtitles } from 'react-icons/md'
import { BiBookAdd } from 'react-icons/bi'
import { SlUserFollowing } from 'react-icons/sl'
import { BsFillCameraFill } from 'react-icons/bs'

import { HiHomeModern } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Popup from 'reactjs-popup'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import PersonalPost from './PersonalPost/PersonalPost'
import Resizer from 'react-image-file-resizer'
import { useSelector } from 'react-redux'
import Followers from './Followers/Followers'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

const Profile = () => {
  const params = useParams()

  const userload = useSelector((state) => state.user)

  const [userData, setUserdata] = useState({})
  const [isuser, setIsuser] = useState(false)

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)

  const [open1, setOpen1] = useState(false)
  const closeModal1 = () => setOpen1(false)

  const [companyname, setCompanyname] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [avatar, setAvatar] = useState('')

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

  useEffect(() => {
    axios
      .get(`https://shart-tank.vercel.app/user/${params.userId}`)
      .then((res) => {
        setUserdata(res.data)
        setIsuser(true)
        setCompanyname(res.data.companyname)
        setName(res.data.name)
        setPhone(res.data.phone)
        setAvatar(res.data.avatar)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [params.userId])

  const updateProfile = () => {
    if (name === '' || phone === '' || companyname === '') {
      return toast.error('Something wrong', {
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

    const updatedata = { id: userData._id, name, phone, companyname, avatar }

    axios
      .post(`https://shart-tank.vercel.app/user/update`, updatedata)
      .then((res) => {
        setUserdata(res.data)
        setOpen(false)
        toast.success('Profile updated', {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch(() => {
        toast.error('Something wrong while updating', {
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
      <Navbar />
      <ToastContainer />
      <div className="profile_main">
        <div className="profile_main_child">
          <div className="profile_main_left">
            <div className="profile_main_left_child">
              <div className="image_section">
                <div className="profile_image_section">
                  {isuser && <img src={userData.avatar} alt="DP" />}
                </div>
                <div className="heading_section">
                  <span style={{ '--i': '1' }}>S</span>
                  <span style={{ '--i': '2' }}>H</span>
                  <span style={{ '--i': '3' }}>A</span>
                  <span style={{ '--i': '4' }}>R</span>
                  <span style={{ '--i': '5' }}>K</span>
                  &nbsp;
                  <span style={{ '--i': '6' }}>T</span>
                  <span style={{ '--i': '7' }}>A</span>
                  <span style={{ '--i': '8' }}>N</span>
                  <span style={{ '--i': '9' }}>K</span>
                </div>
              </div>
              <div className="type_follower_section">
                <div className="profile_type">
                  {isuser && <p>{userData.name}</p>}
                </div>
                <div className="company_name">
                  <FaIndustry />
                  &nbsp;&nbsp;&nbsp; <p>{userData.companyname}</p>
                </div>
                <div className="industry_type">
                  {isuser && userData.industry && <p>{userData.industry}</p>}
                </div>
              </div>
              <div className="profile_detail_section">
                <div className="profile_detail_section1">
                  {isuser && (
                    <p>
                      <AiFillProfile />
                      &nbsp;&nbsp;{userData.profile}
                    </p>
                  )}
                  {isuser && (
                    <p>
                      <MdEmail />
                      &nbsp;&nbsp; {userData.email}
                    </p>
                  )}
                  {isuser && (
                    <p>
                      <MdPhone />
                      &nbsp;&nbsp; {userData.phone}
                    </p>
                  )}
                </div>
                <div className="profile_detail_section2">
                  {isuser && (
                    <>
                      <p onClick={() => setOpen1((o) => !o)}>
                        <SlUserFollowing />
                        &nbsp;&nbsp;{userData.followers.length} followers
                      </p>

                      <Popup
                        open={open1}
                        closeOnDocumentClick
                        onClose={closeModal1}
                      >
                        <Followers
                          followers={userData.followers}
                          setOpen={setOpen1}
                        />
                      </Popup>
                    </>
                  )}
                  {isuser && (
                    <p>
                      <BiBookAdd />
                      &nbsp;&nbsp;Registered
                      {timeAgo.format(new Date(userData.createdAt))}
                    </p>
                  )}
                </div>
                <div className="profile_detail_section3">
                  {!userload.loading &&
                    isuser &&
                    userload.users._id === userData._id && (
                      <FaEdit onClick={() => setOpen((o) => !o)} />
                    )}

                  {isuser && (
                    <Popup
                      open={open}
                      closeOnDocumentClick
                      onClose={closeModal}
                    >
                      <div className="post_form">
                        <div className="detail_right_buttom">
                          <div className="upload">
                            <img
                              id="upload_photo"
                              src={avatar}
                              width="220px"
                              height="200px"
                              alt=""
                            />
                            <div className="round">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={uploadAvatar}
                              />
                              <BsFillCameraFill />
                            </div>
                          </div>
                          <div className="detail_input_field_post">
                            <div className="detail_input_post">
                              <MdSubtitles />
                              <input
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="detail_input_post">
                              <HiHomeModern />
                              <input
                                type="text"
                                value={companyname}
                                placeholder="companyname"
                                onChange={(e) => setCompanyname(e.target.value)}
                              />
                            </div>
                            <div className="detail_input_post">
                              <MdPhone />
                              <input
                                type="text"
                                value={phone}
                                placeholder="Phone"
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>

                            <div className="detail_input_post">
                              <button
                                className="postbtn"
                                onClick={updateProfile}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  )}
                </div>
              </div>
            </div>
            {isuser && userData.profile === 'entrepreneur' && (
              <PersonalPost userId={params.userId} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

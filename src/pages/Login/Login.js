import React, { useState } from 'react'
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'
import poster from '../../assets/shark-tank-poster.jpg'

import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const login = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      navigate('/feed')
    } catch (error) {
      toast.error(error.message.slice(15), {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <ToastContainer />

      <div className="login_main">
        <div className="login_main_child">
          <div className="login_left_box">
            <img src={poster} width="100%" height="100%" alt="" />
          </div>
          <div className="login_right_box">
            <div className="login_head">
              <h1>Login</h1>
            </div>
            <div className="login_email">
              <label>Enter your email </label>
              <input
                type="text"
                onChange={(event) => {
                  setLoginEmail(event.target.value)
                }}
                placeholder="Email"
              />
            </div>
            <div className="login_password">
              <label>Enter your password </label>
              <input
                type="password"
                onChange={(event) => {
                  setLoginPassword(event.target.value)
                }}
                placeholder="Password"
              />
            </div>
            <div className="login_btn">
              <button onClick={login} className="btn">
                SignIn
              </button>
            </div>
            <div className="login_route">
              <Link to="/register">Have not account?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

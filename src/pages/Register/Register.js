import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'
import poster from '../../assets/shark-tank-poster.jpg'

const Register = () => {

    const navigate = useNavigate();

    const [credential, setCredential] = useState({ registerEmail: "", registerPassword: "", registerCnfPassword: "" })
    const handleCredChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }


    const register = async (e) => {

        e.preventDefault();

        if (credential.registerPassword !== credential.registerCnfPassword) {
            return toast.error('Password not matched', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        try {

            await createUserWithEmailAndPassword(
                auth,
                credential.registerEmail,
                credential.registerPassword
            );

            navigate('/create-entrepreneur')

        } catch (error) {
            toast.error(error.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    return (
        <>
            <ToastContainer />

            <div className='register_main' >
                <div className="register_main_child">

                    <div className="register_left_box">
                        <img src={poster} width="100%" height="100%" alt="" />
                    </div>
                    <div className="register_right_box">
                        <div className="register_head">
                            <h1>Register</h1>
                        </div>
                        <div className="register_email">
                            <label>Enter your email  </label>
                            <input type="text" name='registerEmail' onChange={handleCredChange} placeholder="Email" />
                        </div>
                        <div className="register_password">
                            <label>Enter your password  </label>
                            <input type="password" name='registerPassword' onChange={handleCredChange} placeholder="Password" />
                        </div>
                        <div className="register_password">
                            <label>Confirm password  </label>
                            <input type="password" name='registerCnfPassword' onChange={handleCredChange} placeholder="Password" />
                        </div>
                        <div className="register_btn">
                            <button onClick={register} className='btn' >SignUP</button>
                        </div>
                        <div className="register_route">
                            <Link to='/login' >Have account?</Link>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default Register
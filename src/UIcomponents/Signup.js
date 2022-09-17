import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import Button from './Button'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState({
        email: false,
        password: false,
    });



    const signupHandler = (e) => {

        e.preventDefault();
        if (
            email === '' || password === ''
        ) {
            if (email == '') {
                setError({
                    ...error,
                    email: true,
                })
            }
            if (password == '') {
                setError({
                    ...error,
                    password: true,
                })
            }
            return;
        }
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setEmail('');
            setPassword('');
            setNotification({
                type: 'success',
                message: 'done'
            })
        }).catch((err)=>{
            setNotification({
                type: 'success',
                message: 'fail'
            })
        })


    };

    return (
        <div className="modal-card signin-card">
            <span className="close-modal" onClick={() => {
                props.closeSignupmodal();
            }}>
                &times;
            </span>
            <form className="signin-form" onSubmit={signupHandler}>
                <h3 className='text-2xl text-center font-bold'>Login to Continue</h3>
                <p className='font-light text-center text-sm mt-3 mb-3'>It will take no time.</p>
                {notification && (
                    <div className={"notify " + notification.type}>
                        {notification.message}
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        className={"form-field " + (error.email ? "error-border" : "")}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
                            if (!regex.test(e.target.value)) {
                                setError((err) => ({
                                    ...err,
                                    email: true,
                                }));
                            } else {
                                setError((err) => ({
                                    ...err,
                                    email: false,
                                }));
                            }
                        }}
                    />
                    {error.email && (
                        <span className="error-message">Invalid email address</span>
                    )}
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        className={"form-field " + (error.password ? "error-border" : "")}
                        id="password"
                        placeholder="Password"
                        autoComplete="on"
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (e.target.value === "")
                                setError((err) => ({
                                    ...err,
                                    password: true,
                                }));
                            else
                                setError((err) => ({
                                    ...err,
                                    password: false,
                                }));
                        }}
                    />
                    {error.password && (
                        <span className="error-message">Password cannot be empty</span>
                    )}
                </div>
                <Button active buttonText="LOGIN" icon={UserCircleIcon} />
            </form>
        </div>
    )
}

export default Signup
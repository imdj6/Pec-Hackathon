import React, { useEffect, useState } from "react";
import Button from "./Button";
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import './SignIn.css'
import { auth } from "../firebase";
function SignIn(props) {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [notification, setNotification] = useState(false);

    const [error, setError] = useState({
        username: false,
        email: false,
        category: false,
        password: false,
        cpassword: false,
    });

    const signupHandler = (e) => {
        e.preventDefault();
        if (
            error.username ||
            error.email ||
            error.category ||
            error.password ||
            error.cpassword
        ) {
            return;
        }
        if (
            username === "" ||
            email === "" ||
            password === "" ||
            cpassword !== password
        ) {
            if (username === "")
                setError((prev) => ({
                    ...prev,
                    username: true,
                }));
            if (email === "")
                setError((prev) => ({
                    ...prev,
                    email: true,
                }));

            if (password === "")
                setError((prev) => ({
                    ...prev,
                    password: true,
                }));
            if (cpassword !== password)
                setError((prev) => ({
                    ...prev,
                    cpassword: true,
                }));
            return;
        }
        auth.createUserWithEmailAndPassword(email, cpassword).then((authUser) => {
            authUser.user.updateProfile({
                displayName: username,
                photoURL: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
            setEmail('');
            setCpassword('');
            setUserName('');
            setPassword('');
            setNotification({
                type: 'success',
                message: 'done'
            })
        }).catch((error) => {
            console.log(error)
        })


    };

    return (
        <div className="modal-card signin-card">
            <span className="close-modal" onClick={() => {
                props.closeLoginmodal();
            }}>
                &times;
            </span>

            <form className="signin-form" onSubmit={signupHandler}>
                <h3 className='text-2xl text-center font-bold'>Create a new account</h3>
                <p className='font-light text-center text-sm mt-3 mb-3'>It's quick and easy.</p>
                {notification && (
                    <div className={"notify " + notification.type}>
                        {notification.message}
                    </div>
                )}
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        className={"form-field " + (error.username ? "error-border" : "")}
                        placeholder="Name"
                        onChange={(e) => {
                            setUserName(e.target.value);
                            if (e.target.value.length <= 2 || e.target.value.length >= 20) {
                                setError((err) => ({
                                    ...err,
                                    username: true,
                                }));
                            } else {
                                setError((err) => ({
                                    ...err,
                                    username: false,
                                }));
                            }
                        }}
                    />
                    {error.username && (
                        <span className="error-message">
                            Username must be between 2 and 20 characters
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        className={"form-field " + (error.email ? "error-border" : "")}
                        placeholder="Email Address"
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
                        <span className="error-message">Invalid Email Address</span>
                    )}
                </div>
                <div className="form-group split-group">
                    <div>
                        <input
                            value={password}
                            type="password"
                            className={"form-field " + (error.password ? "error-border" : "")}
                            placeholder="Password"
                            autoComplete="on"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                const re = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d$@$!%*#?&]{8,}$/;
                                if (!re.test(e.target.value)) {
                                    setError((err) => ({
                                        ...err,
                                        password: false,
                                    }));
                                } else {
                                    setError((err) => ({
                                        ...err,
                                        password: true,
                                    }));
                                }
                            }}
                        />
                        {error.password && (
                            <span className="error-message">
                                Minimum eight characters, at least one uppercase letter, one
                                lowercase letter and one number
                            </span>
                        )}
                    </div>
                    <div>
                        <input
                            value={cpassword}
                            type="password"
                            className="form-field"
                            placeholder="Confirm Password"
                            autoComplete="on"
                            onChange={(e) => {
                                setCpassword(e.target.value);
                                if (e.target.value !== password) {
                                    setError((err) => ({
                                        ...err,
                                        cpassword: true,
                                    }));
                                } else {
                                    setError((err) => ({
                                        ...err,
                                        cpassword: false,
                                    }));
                                }
                            }}
                        />
                        {error.cpassword && (
                            <span className="error-message">Password did not match</span>
                        )}
                    </div>
                </div>
                <Button buttonText='Create Account' clickHandler={
                    signupHandler} active icon={UserCircleIcon} />

            </form>
        </div>
    )
}

export default SignIn
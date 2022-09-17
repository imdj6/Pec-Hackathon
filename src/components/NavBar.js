import React, { useState } from 'react'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import Button from '../UIcomponents/Button'
import Modal from '../UIcomponents/Modal'
import SignIn from '../UIcomponents/SignIn'
import Signup from '../UIcomponents/Signup'
function NavBar() {
    const [state,setState]=useState({
        signin:false,
        signup:false
    });
    const closeSignupmodal=()=>{
        setState(
            {
                signin:false,
                signup:false
            }
        )
    }
    const closeLoginmodal=()=>{
        setState(
            {
                signin:false,
                signup:false
            }
        )
    }

    return (
        <>
        {
            (state.signin || state.signup ) && (
                <Modal>
                 {state.signin && <SignIn closeLoginmodal={closeLoginmodal}/>}
                 {state.signup && <Signup closeSignupmodal={closeSignupmodal}/>}
                </Modal>
            )
        }
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Doddle Drive</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active hover:bg-[#6a5feb] " aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                           
                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        {/* <button className="btn btn-outline-success mr-5" type="submit">Sign in</button>
                        <button className="btn btn-outline-success mr-10" type="submit">Sign up</button> */}
                        <Button buttonText='Sign Up' clickHandler={()=>{
                          setState({
                            signin:true,
                            signup:false
                          })
                        }} active icon={UserCircleIcon} />
                        <Button buttonText='Sign In' clickHandler={()=>{
                          setState({
                            signin:false,
                            signup:true
                          })
                        }}  active icon={UserPlusIcon} properties={{marginLeft:'20px'}}/>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
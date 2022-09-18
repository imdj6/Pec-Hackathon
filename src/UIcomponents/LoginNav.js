import React from 'react'
import Button from './Button'
import { UserCircleIcon ,HomeIcon, HeartIcon} from '@heroicons/react/24/solid'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'




function LoginNav() {
    const navigate=useNavigate();
    const logout=()=>{
        const auth = getAuth();
        signOut(auth).then((params) => {
          navigate('/')
        }).catch((error) => {
         console.log(error);
        });
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-white ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Doddle Drive</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active hover:bg-white " aria-current="page" href="#"><HomeIcon className="h-6 w-6 text-[#6a5feb]"/></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled">Disabled</a>
                            </li>
                        </ul>
                        <Button buttonText='Logout' clickHandler={logout} active icon={UserCircleIcon} />
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default LoginNav
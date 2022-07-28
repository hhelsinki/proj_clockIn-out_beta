import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Facebook_Login() {
    const navigate = useNavigate();

    const signInFB = () => {
        const auth = getAuth();
        const provider = new FacebookAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                console.log('fb login success!');
                navigate('/home');
                toast.success('Login Successfully!', { autoClose: 1000 });
                sessionStorage.setItem('Auth Token', result.refreshToken);

            })
            .catch((error) => {
                console.log(error)
            });
    }


    return (
        <div>
            <button type="button" className="butt-authen-service bg-facebook border-facebook col-white cursor" onClick={() => signInFB()}>Sign In with FB</button>
        </div>

    );
}

export default Facebook_Login;
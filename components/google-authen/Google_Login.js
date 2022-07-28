import React, { useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Google_Login() {


    const navigate = useNavigate();

    const signInGG = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result)=>{
            console.log('gg login success!');
            navigate('/home');
                toast.success('Login Successfully!', { autoClose: 1000 });
            sessionStorage.setItem('Auth Token', result.refreshToken);
        })
        .catch((error)=> {
            console.log(error)
        });

    }


    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token');

        if (!authToken) {
            navigate('/login')
        }

    }, []);



    return (
        <div>
            <div className="rel">
            <button type="button" className="butt-authen-service bg-google border-google col-white cursor" style={{marginBottom: '3px'}} onClick={() => signInGG()}>Sign In with Google</button>
            </div>
        </div>
        
    );
}

export default Google_Login;
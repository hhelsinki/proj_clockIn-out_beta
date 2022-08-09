import * as React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';

export default function BasicTextFields({ title, setPassword, setEmail, handleAction, resetPassword, txt_forgetPassword, txt_suggestToRegister, txt_reset, txt_here, txt_suggestToLogin, txt_login }) {
    let navigate = useNavigate();


    return (
        <div>
            <div className="heading-container">
                <h3 id="title">
                    {title} Form
                </h3>
            </div>


            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Enter the Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
               
            </Box>

            <Button title={title} handleAction={handleAction} />
            <br />
            <br />
            <p>{txt_forgetPassword}<a href="/reset-password">{txt_reset}</a></p>
            <p>{txt_suggestToRegister}<a href="/register">{txt_here}</a></p>
            <p>{txt_suggestToLogin}<a href="/login">{txt_login}</a></p>

        </div>
    );
}
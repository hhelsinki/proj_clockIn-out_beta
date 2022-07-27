import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Staff_dashboard() {
    //AUTHEN FIREBASE
    const authentication = getAuth();
    let navigate = useNavigate();


    let handleLogout = () => {
        setTimeout(() => {
            sessionStorage.removeItem('Auth Token');

        }, 1000);
        //toast.info('Log out Successfully!', { autoClose: 1000 })
        navigate('/login')
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        console.log('get: ' + authToken);

        if (authToken) {

            let getUID = onAuthStateChanged(authentication, (user) => {
                if (user) {
                    var uid = user.uid;
                    console.log('uid:' + uid);

                    switch (uid) {
                        //admin 1
                        case 'MscmztHSkrTo9xyW856ltvBjiZ13':
                            console.log('get uid: ' + uid);
                            navigate('/admin_dashboard');
                            break;
                        //admin 2
                        case 'G65572jkApQfz3TuLCCDzHUK6U52':
                            console.log('get uid: ' + uid);
                            navigate('/admin_dashboard');
                            break;
                        //staff
                        case 'dydPybXGnYMg92wYBwb6HaHdYvt2':
                            console.log('get uid: ' + uid);
                            navigate('/staff_dashboard');
                            break;

                        default:
                            const alp = 'abcd';
                            console.log('uid: ' + alp);
                            navigate('/home');
                            break;
                    }
                    // ...
                } else {
                    console.log('user is log out');
                }
            });
            getUID();

        }
        if (!authToken) {
            navigate('/login')
        }

    }, [])

    //CLOCK IN/OUT function
    
    //GET JSON
    var now = new Date();
    var getToday = now.toLocaleDateString('en-CA');

    const path = 'https://clockinout.bongkotsaelo.repl.co/export_JSON/jonathanB/';
    const jonathanB_name = 'jonathanB_';
    const fileName = '.json';

        //dp variable
        var dp_clockIn, dp_clockOut;

    fetch(path + jonathanB_name + getToday + fileName)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dp_clockIn = 'Clock in: ' + data.clockIn;
            this.dp_clockOut = 'Clock out: ' + data.clockout;

        });

    //CRUD
    const data = {};
    const options_write = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const options_update = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    async function writeJson() {

        const response = await fetch('https://clockinout.bongkotsaelo.repl.co/post', options_write);
        const jsonRes = await response.json();
        console.log(jsonRes);
    }

    async function updateJson() {

        const response = await fetch('https://clockinout.bongkotsaelo.repl.co/update', options_update);
        const jsonRes = await response.json();
        console.log(jsonRes);
    }



    return (
        <div>
            <div>
                <h1>Welcome, Jonathan</h1>
                <Button variant="contained" onClick={handleLogout}>Log Out</Button>
            </div>

            <div>
                <h3>Time Stamp</h3>
                <h4>Today: {getToday}</h4>
                <button id="butt_clockIn" type="button" onClick={()=>{writeJson();}}>Clock In</button>
                <button id="butt_clockOut" type="button" onClick={()=>{updateJson();}}>Clock Out</button>
            </div>

            <div>
                <p><span>{dp_clockIn}</span></p>
                <p><span>{dp_clockOut}</span></p>
            </div>

        </div>
    );

}
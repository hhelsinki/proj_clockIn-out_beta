import React, { useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Staff_Component extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dp_clockIn: [],
            dp_clockOut: []
        }
    }

    componentDidMount() {

        var now = new Date();
        var getToday = now.toLocaleDateString('en-CA');
        const path = 'https://clockinout.bongkotsaelo.repl.co/export_JSON/jonathanB/';
        const jonathanB_name = 'jonathanB_';
        const fileName = '.json';

        fetch(path + jonathanB_name + getToday + fileName)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        dp_clockIn: result.clockIn,
                        dp_clockOut: result.clockOut
                    })
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    //test CRUD
    async writeJson() {
        const data = {};
        const options_write = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('https://clockinout.bongkotsaelo.repl.co/post', options_write);
        const jsonRes = await response.json();
        console.log(jsonRes);
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    }
    async updateJson() {
        const data = {};
        const options_update = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('https://clockinout.bongkotsaelo.repl.co/update', options_update);
        const jsonRes = await response.json();
        console.log(jsonRes);
        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
    }

    render() {
        var now = new Date();
        var getToday = now.toLocaleDateString('en-CA');

        const { dp_clockIn, dp_clockOut } = this.state;

        return (
            <div>
                <div>
                    <h3>Time Stamp</h3>
                    <h4>Today: {getToday}</h4>
                    <button type="button" onClick={() => this.writeJson()}>Clock In</button>
                    <button type="button" onClick={() => this.updateJson()}>Clock Out</button>
                </div>

                <div>
                    <p><span>Push in: {dp_clockIn}</span></p>
                    <p><span>Push out: {dp_clockOut}</span></p>
                </div>
            </div>
        );
    }
}

function Staff_dashboard() {
    //AUTHEN FIREBASE
    const authentication = getAuth();
    let navigate = useNavigate();


    let handleLogout = () => {
        setTimeout(() => {
            sessionStorage.removeItem('Auth Token');

        }, 1000);
        toast.info('Log out Successfully!', { autoClose: 1000 })
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



    //CRUD


    return (
        <div>
            <div>
                <h1>Welcome, Jonathan</h1>
                <Button variant="contained" onClick={handleLogout}>Log Out</Button>
            </div>

            <Staff_Component />


        </div>
    );

}

export default Staff_dashboard;
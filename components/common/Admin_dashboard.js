import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Admin_dashboard() {
    const authentication = getAuth();


    let handleLogout = () => {
        setTimeout(() => {
            sessionStorage.removeItem('Auth Token');

        }, 1000);
        //toast.info('Log out Successfully!', { autoClose: 1000 })
        navigate('/login')
    }
    let navigate = useNavigate();


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



    var now = new Date();
    var getToday = now.toLocaleDateString('en-CA');

    return (
        <div>
            <div>
                <h1>Welcome, Admin</h1>
                <h3>{getToday}</h3>
                <Button variant="contained" onClick={handleLogout}>Log Out</Button>
            </div>

            <div>
                <div className="border" style={{width:'100%', height:'50vh'}}>
                    <div className="grid grid-col">
                        <div className="border" style={{height:'40vh'}}>
                            <h4>Present</h4>
                            <div id="dp_present">
         
                            </div>

                        </div>
                        <div className="border" style={{height:'40vh'}}>
                            <h4>Absent</h4>
                            <div id="dp_absent">

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )

}
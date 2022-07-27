import React, { useEffect, Component } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class Admin_component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dp_presentI: [],
            dp_presentII: [],
            dp_absentI: [],
            dp_absentII: [],

            nameI: [],
            posI: [],
            levI: [],
            phoI: [],

            nameII: [],
            posII: [],
            levII: [],
            phoII: [],

            nameIII: [],
            posIII: [],
            levIII: [],
            phoIII: [],

            obj_hidden_allStaff: true,
 
        }
    }


    componentDidMount() {


        fetch("https://jsonkeeper.com/b/2YW7")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.name);
                    this.setState({
                        isLoaded: true,
                        dp_presentI: result.name
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

        fetch("https://fakefakejson.com/jacindaW.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.name);
                    this.setState({
                        isLoaded: true,
                        dp_presentII: result.name
                    });
                },

                (error) => {
                    console.log('jacindaW json not found');
                    this.setState({
                        isLoaded: true,
                        dp_absentI: 'Jacinda K',
                        error
                    });
                }
            )

        fetch('https://script.googleusercontent.com/macros/echo?user_content_key=rXfcLI2vj8osfId5eimzTcTscKww3Yc-CzemTaKHELGxjmYu0i_6racnXjXkEztuBOegBvTPTKRTs6nsuwtnPh4CPE3HCkcpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEIyyCba9qvHTm4uWib0r67b9lCRs6U95sGGDxiSSA2-SdfOncWWlEhwYIu_ENi-p33ccVxROLSUYrNx2aG1VDb27v5XWc5bfg&lib=MOjrKQQZVRpspGaTDp3Mng2WFmcn5yvuo')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        nameI: result.user[0].Name,
                        posI: result.user[0].Position,
                        levI: result.user[0].Level,
                        phoI: result.user[0].Photo,

                        nameII: result.user[1].Name,
                        posII: result.user[1].Position,
                        levII: result.user[1].Level,
                        phoII: result.user[1].Photo,

                        nameIII: result.user[2].Name,
                        posIII: result.user[2].Position,
                        levIII: result.user[2].Level,
                        phoIII: result.user[2].Photo
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

    hiddenAllStaff = () => {
        this.setState({
            obj_hidden_allStaff: !this.state.obj_hidden_allStaff
        });
    }


    render() {
        const {
            dp_presentI, dp_absentI, dp_absentII, dp_presentII,
            nameI, posI, levI, phoI,
            nameII, posII, levII, phoII,
            nameIII, posIII, levIII, phoIII,
            obj_hidden_allStaff
        } = this.state;

        return (
            <div>
                <div className="border" style={{ width: '100%', height: '50vh' }}>
                    <div className="grid grid-col">
                        <div className="border" style={{ height: '40vh' }}>
                            <h4>Present</h4>
                            <div>
                                <p>{dp_presentI}</p>
                            </div>

                        </div>
                        <div className="border" style={{ height: '40vh' }}>
                            <h4>Absent</h4>
                            <div>
                                <p>{dp_absentI}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <a href="https://docs.google.com/spreadsheets/d/1qjIFp4H9nv_Xr0DFG0aOEnmpAqbGuBy0cuR4g90lckY/edit?usp=sharing" target="_blank" ><button type="button">Download History</button></a>
                </div>

                <div>
                    <button type="button" onClick={() => this.hiddenAllStaff()}>See All Staff</button>
                    <div className={obj_hidden_allStaff ? "dp-none" : "dp-block"}>
                        <div className="box border">
                            <img src={phoI} className="box-img" />
                            <p>{nameI}</p>
                            <p>{posI}</p>
                            <p>{levI}</p>
                        </div>
                        <div className="box border">
                            <img src={phoII} className="box-img" />
                            <p>{nameII}</p>
                            <p>{posII}</p>
                            <p>{levII}</p>
                        </div>
                        <div className="box border">
                            <img src={phoIII} className="box-img" />
                            <p>{nameIII}</p>
                            <p>{posIII}</p>
                            <p>{levIII}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <a href="https://docs.google.com/spreadsheets/d/1WS_MnrSEz0XaUtd1l1XSTVYoYuim8ZEJpEckXXbDhnU/edit#gid=0" target="_blank"><button type="button">Edit Staff</button></a>
                    
                </div>


            </div>
        );
    }
}

function Admin_dashboard() {

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
        let authToken = sessionStorage.getItem('Auth Token');
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



            <Admin_component />

        </div>
    )

}

export default Admin_dashboard;
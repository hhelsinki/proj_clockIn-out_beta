
import './App.css';
import Form from './components/common/Form.js';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { app } from './firebase-config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import Home from './components/common/Home.js';
import ResetPassword from './components/common/ResetPassword';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Staff_dashboard from './components/common/Staff_dashboard_update';
import Admin_dashboard from './components/common/Admin_dashboard_update';


function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authentication = getAuth();
  const txt_forgetPassword = 'Forget Password? stable ';
  const txt_suggestToRegister = 'No account? stable Register ';
  const txt_here = 'Here';
  const txt_reset = 'Reset';
  const txt_suggestToLogin = 'Already have an Account? stable ';
  const txt_login = 'Login';
  let navigate = useNavigate();

  const handleAction = (id) => {
    console.log(id);

    //login
    if (id == 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          setTimeout(() => {
            navigate('/home');
            console.log('delay')
          }, 1000);
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
          toast.success('Login Successfully!', { autoClose: 1000 });
          console.log('login successfully!');

        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Please check the Password', { autoClose: 1500 })

          }
          if (error.code === 'auth/user-not-found') {
            toast.error('Please check the Email', { autoClose: 1500 })
          }
        });

    }
    //register
    if (id === 2) {
      createUserWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate('./login')
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken);
          toast.info('Register Successfully!', { autoClose: 1000 })
          console.log(response);
          console.log('register successfully!');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use', { autoClose: 1500 });
          }
        })
    }
    if (id === 3) {
      sendPasswordResetEmail(authentication, email)
        .then(() => {
          console.log('Password reset email sent!');
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          console.log(error.code + error.message);
          console.log('please enter the correct email!')

          // ..
        });
    }
  };

  useEffect(() => {

    if (window.location.pathname == '/') {
      navigate('/login');
    } else { console.log('unknow location') }

    let authToken = sessionStorage.getItem('Auth Token');

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

          /*
          if (uid == 'dydPybXGnYMg92wYBwb6HaHdYvt2') {
            console.log('get uid: ' + uid);
            navigate('/staff_dashboard');
          } else {
            const alp = 'abcd';
            console.log('uid: ' + alp);
            navigate('/home');
          }
          */


          // ...
        } else {
          console.log('user is log out');
        }
      });
      getUID();

    }




    /*
    onAuthStateChanged(authentication, (user) => {
      var uid;
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        uid = user.uid;
        console.log('uid: ' + uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    
    })
    */




  }, []);



  return (

    <div className="App">


      <ToastContainer />
      <>
        <Routes>

          <Route
            path='/login'
            element={
              <Form
                title='Login'
                setEmail={setEmail}
                setPassword={setPassword}
                handleAction={() => handleAction(1)}
                txt_forgetPassword={txt_forgetPassword}
                txt_suggestToRegister={txt_suggestToRegister}
                txt_reset={txt_reset}
                txt_here={txt_here}

              />

            } />
          <Route path='/register' element={
            <Form
              title='Register'
              setEmail={setEmail}
              setPassword={setPassword}
              handleAction={() => handleAction(2)}
              txt_suggestToLogin={txt_suggestToLogin}
              txt_login={txt_login}

            />} />
          <Route path='/reset-password' element={
            <ResetPassword
              title='Reset Password test'
              setEmail={setEmail}
              handleAction={() => handleAction(3)}

            />} />
          <Route
            path='/home'
            element={
              <Home />}
          />
          <Route
            path='/staff_dashboard'
            element={
              <Staff_dashboard />}
          />
          <Route
            path='/admin_dashboard'
            element={
              <Admin_dashboard />}
          />

        </Routes>
      </>
    </div>

  );
}

export default App;

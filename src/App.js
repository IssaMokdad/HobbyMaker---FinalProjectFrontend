import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ForgotPassword from './Components/ForgotPassword'
import { BrowserRouter as Router, Redirect,  Switch, Route } from "react-router-dom";
import PasswordReset from './Components/PasswordReset';
import ConfirmRegistration from './Components/ConfirmRegistration'
import ProfilePage from './Components/ProfilePage';
// import Map from './Components/Map'
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'bb8b5c6a21ad2865dda7',
  cluster: 'ap2',
  forceTLS: true
});
var channel = window.Echo.channel('my-channel');



function App() {

  const [userAuthenticated, setUserAuthenticated] = useState({
    firstName:'',
    lastName:'',
    userId:''
  });
  const [rTNotification, setRTNotification] = useState()
  const [token, setToken] = useState('')
  const logout = ()=>{ 
    localStorage.clear()
    setToken('')
    window.location.reload();
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(1)
      setUserAuthenticated({
        firstName:localStorage.getItem('firstName'),
        lastName:localStorage.getItem('lastName'),
        userId:localStorage.getItem('userId')
      })
      channel.listen('.my-event', function(data) {
        // let NT = []
        // NT.push(data)
        setRTNotification(data)

      });
    }

  }, [token])//render again to assign user data if login successful


  
//this method is passed to login component called from it
  const handleChangeToken = (event) => {
    localStorage.setItem('token', event.access_token)
    localStorage.setItem('firstName', event.first_name)
    localStorage.setItem('lastName', event.first_name)
    localStorage.setItem('userId', event.user_id)
    setToken(1)//this renders the component, but let useEffect render again on token change to assign the data to the user and avoid writing it in a separate method to avoid repeated code it
  
  }
  console.log(rTNotification)
  return (
    <div style={{backgroundColor:'#F0F0F0'}}>
    <Router>
      <Switch>
        <Route path='/home'>
          {token !== '' ? <Home rTNotification={rTNotification} logout={logout} userAuthenticated={userAuthenticated} />
            : <Redirect to='/' />
          }
        </Route>
        <Route path='/profile/:userId'>
          {token !== '' ? <ProfilePage logout={logout} userAuthenticated={userAuthenticated} />
            : <Redirect to='/' />
          }
        </Route>
        <Route path="/confirm-registration/:token">
          <ConfirmRegistration />
        </Route>
        <Route exact path='/'>
        {/* <Map /> */}
          {token === '' ? <Login handleChangeToken={handleChangeToken} />
            : <Redirect to='/home' />
          }
        </Route>
          <Route path="/password-reset-confirm/:token">
          <PasswordReset />
          </Route>
        <Route path='/passwordreset'>
          {token === '' ? <ForgotPassword />
            : <Redirect to='/home' />
          }
        </Route>
        <Route path='/signup'>
          {token === '' ? <SignUp />
            : <Redirect to='/home' />
          }
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;

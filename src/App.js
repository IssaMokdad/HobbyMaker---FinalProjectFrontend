import React, { useState, Fragment, useEffect } from 'react';
import './App.css';
import Home from './Components/Home'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import ForgotPassword from './Components/ForgotPassword'
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import PasswordReset from './Components/PasswordReset';
import ConfirmRegistration from './Components/ConfirmRegistration'
// import Map from './Components/Map'
function App() {

  const [userAuthenticated, setUserAuthenticated] = useState({
    firstName:'',
    lastName:'',
    userId:''
  });
  const [token, setToken] = useState('')
  const logout = ()=>{
    localStorage.setItem('token', '')
    setToken('')
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(1)
      setUserAuthenticated({
        firstName:localStorage.getItem('firstName'),
        lastName:localStorage.getItem('lastName'),
        userId:localStorage.getItem('userId')
      })
    }

  }, [])

  const handleChangeToken = (event) => {
    localStorage.setItem('token', event.access_token)
    localStorage.setItem('firstName', event.first_name)
    localStorage.setItem('lastName', event.first_name)
    localStorage.setItem('userId', event.user_id)
    setToken(1)

    
  }
  return (
    
    <Router>
      <Switch>
        <Route path='/home'>
          {token !== '' ? <Home logout={logout} userAuthenticated={userAuthenticated} />
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
  );
}

export default App;

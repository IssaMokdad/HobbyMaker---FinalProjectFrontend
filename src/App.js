import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import PasswordReset from "./Components/PasswordReset";
import ConfirmRegistration from "./Components/ConfirmRegistration";
import ProfilePage from "./Components/ProfilePage";
// import Map from './Components/Map'
import { api, token } from "./Components/Apis";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import MessengerApp from "./Components/Messenger/App";
import OneTimePage from './Components/OneTimePage'


function App() {
  const [userAuthenticated, setUserAuthenticated] = useState({
    userId: "",
  });
  const [firstTimeLogin, setFirstTimeLogin] = useState('')
  const [rTNotification, setRTNotification] = useState();
  const [realTimeMessage, setRealTimeMessage] = useState();
  const [token, setToken] = useState("");
  const logout = () => {
    localStorage.clear();
    setToken("");
    window.location.reload();
  };
  const setRTMEmpty = () => {
    setRealTimeMessage("");
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(1);
      setUserAuthenticated({
        userId: localStorage.getItem("userId"),
      });

      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "bb8b5c6a21ad2865dda7",
        cluster: "ap2",
        authEndpoint: api + "api/broadcasting/auth",
        auth: {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
        forceTLS: true,
      });
      var channel = window.Echo.private(
        "my-channel." + userAuthenticated.userId
      );

      channel.listen(".add-request", function (data) {
        setRTNotification(data);
      });
      channel.listen(".real-time-chat", function (data) {
        setRealTimeMessage({
          id: data.message.id,
          timestamp: data.message.created_at,
          message: data.message.message,
          from: data.message.from,
        });
      });
    }
  }, [token]); //render again to assign user data if login successful

  //this method is passed to login component called from it
  const handleChangeToken = (event) => {
    localStorage.setItem("token", event.access_token);
    localStorage.setItem("userId", event.user_id);
    setToken(1); //this renders the component, but let useEffect render again on token change to assign the data to the user and avoid writing it in a separate method to avoid repeated code it
  };
  console.log(rTNotification);
  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <Router>
        <Switch>
        <Route path="/onetimepage">
            {(token !== "" && firstTimeLogin) ? (
              <OneTimePage userAuthenticated={userAuthenticated} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/home">
            {token !== "" ? (
              <Home
                rTNotification={rTNotification}
                logout={logout}
                userAuthenticated={userAuthenticated}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/messenger">
            {token !== "" ? (
              <MessengerApp
                setRTMEmpty={setRTMEmpty}
                realTimeMessage={realTimeMessage}
                userAuthenticatedId={userAuthenticated.userId}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/profile/:userId">
            {token !== "" ? (
              <ProfilePage
                logout={logout}
                userAuthenticated={userAuthenticated}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/confirm-registration/:token">
            <ConfirmRegistration />
          </Route>
          <Route exact path="/">
            {/* <Map /> */}
            {token === "" ? (
              <Login handleChangeToken={handleChangeToken} />
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
          <Route path="/password-reset-confirm/:token">
            <PasswordReset />
          </Route>
          <Route path="/passwordreset">
            {token === "" ? <ForgotPassword /> : <Redirect to="/home" />}
          </Route>
          <Route path="/signup">
            {token === "" ? <SignUp /> : <Redirect to="/home" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";

function Home() {

  if(localStorage.getItem('token')===null){
    return(<Router><Redirect to="/" /></Router> )
    }
    return (<Link to='/ggggggg'>Go Back</Link>);
}

export default Home;

import React, {Fragment,useState, useEffect} from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from "react-router-dom";
import AppNavBar from './AppNavBar';
import PostCard from './PostCard';
import { fetchRequest } from "./Apis";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

function Home(props) {

  const [posts, setPosts] = useState('')
  
  useEffect(()=>{
    fetchRequest("http://localhost:8000/api/post/get", "get").then(response=>{
    setPosts(response.data)
    })
  } ,[])

    let postss = Array.from(posts).map(post=>
      <Grid key={post.id} item><PostCard post={post} userAuthenticatedId={props.userAuthenticated.userId}  /></Grid>) 

    return (
    <Fragment><AppNavBar /><Container maxWidth="xl"><Grid container xs={12}><Grid xs={3} container></Grid><Grid style={{justifyContent:'center',marginTop:'30px', alignItems:'center'}} spacing={3} container item xs={6}>{postss}</Grid><Grid xs={3} container></Grid></Grid></Container> </Fragment>
      );
}

export default Home;

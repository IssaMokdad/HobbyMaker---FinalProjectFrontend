import React, { Fragment, useState,useRef, useEffect } from "react";
import BottomScrollListener from 'react-bottom-scroll-listener';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AppNavBar from "./AppNavBar";
import PostCard from "./PostCard";
import { fetchRequest, api } from "./Apis";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card2 from "./Card2";
import PostForm from "./PostForm";

function Home(props) {
  const [posts, setPosts] = useState("");
  const [page, setPage] = useState(1)
  const [usersRecommendation, setUsersRecommendations] = useState("")
  const handleScroll = (event) => {
    setPage(page+1)
    getPosts()
    
    // let element = event.target
    // if (element.scrollHeight - element.scrollTop === element.clientHeight) {
    //   alert('done')
    //   setPage(++page)
    //   getPosts()
     
    // }
  }

  const getFriendRecommendations = () => {
    fetchRequest(api + "api/users/get-recommendations?user_id="+props.userAuthenticated.userId , "get").then((response) => {
      console.log(response.data)
      if(response.data!==undefined)
      setUsersRecommendations(response.data);
    })};

  const getPosts = () =>
    fetchRequest(api + "api/post/get?user_id=" + props.userAuthenticated.userId + "&page="+page, "get").then((response) => {
      if(response.data!==undefined)
      setPosts(response.data);
    });
  const handlePostsAdd = () => {
    getPosts();
  };

  useEffect(() => {
    getPosts();
    getFriendRecommendations();
  }, []);

  let postss = Array.from(posts).map((post) => (
    <Grid style={{width:'80%'}} key={post.id} item>
      <PostCard
        post={post}
        getPosts={getPosts}
        userAuthenticatedId={props.userAuthenticated.userId}
      />
    </Grid>
  ));

  return (
    <Fragment>
      <AppNavBar logout={props.logout} />
      <div >
      <Container  maxWidth="xl">
      <BottomScrollListener onBottom={handleScroll} />
        <Grid container xs={12}>
          <Grid xs={3} container></Grid>
          <Grid
          
            style={{
              justifyContent: "center",
              marginTop: "30px",
              alignItems: "center",
              display:'flex',
              flexDirection:'column',
            }}
            spacing={3}
            container
            item
            xs={6}
          >
            <div style={{ width: "80%" }}>
              <PostForm handlePostsAdd={handlePostsAdd} userAuthenticatedId={props.userAuthenticated.userId} />
            </div>
            {postss}
          </Grid>
          <Grid xs={3} container></Grid>
        </Grid>
      </Container>{" "}
      </div>
    </Fragment>
  );
}

export default Home;

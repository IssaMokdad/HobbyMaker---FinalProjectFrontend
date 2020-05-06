import React, { Fragment, useState, useRef, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
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
import FriendSuggestionCard from "./FriendSuggestionCard";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";

function Home(props) {
  const [posts, setPosts] = useState("");

  const [page, setPage] = useState(1);

  const [usersRecommendation, setUsersRecommendations] = useState("");

  //this method is called when we hit the bottom page
  const handleScroll = (event) => {
    setPage(page + 1);

    getPosts();
  };
  //getting friend recommendations to show
  const getFriendRecommendations = () => {
    fetchRequest(
      api +
        "api/users/get-recommendations?user_id=" +
        props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data !== undefined) {
        setUsersRecommendations(response.data);
      }
    });
  };
  //getting posts, initial page is 1 and is icremented on every bottom scroll event
  const getPosts = () =>
    fetchRequest(
      api +
        "api/post/get?user_id=" +
        props.userAuthenticated.userId +
        "&page=" +
        page,
      "get"
    ).then((response) => {
      if (response.data !== undefined) setPosts(response.data);
    });
  const [randomQuote, setRandomQuote] = useState("");

  const [hobbyVideos, setHobbyVideos] = useState("");

  //getting a random quote by the following api
  const getRandomQuote = () => {
    fetchRequest("https://api.quotable.io/random", "get").then((response) => {
      setRandomQuote(response);
    });
  };
  //getting hobby videos from youtube related to the hobby of the user, 20 videos
  // const getHobbyVideos = ()=>{
  //   fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=cycling&type=video&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M').then(response=>response.json()).then(response=>{
  //     setHobbyVideos(response.items)
  //   })
  // }


  //On every post add, call getPosts() to get posts latest 5 posts
  const handlePostsAdd = () => {
    getPosts();
  };

  useEffect(() => {
    getPosts();
    getFriendRecommendations();
    getRandomQuote();
    // getHobbyVideos();
  }, []);
  
  //making an array of posts and passing getPosts method, post and userid as props
  let postss = Array.from(posts).map((post) => (
    <Grid style={{ width: "80%" }} key={post.id} item>
      <PostCard
        post={post}
        getPosts={getPosts}
        userAuthenticatedId={props.userAuthenticated.userId}
      />
    </Grid>
  ));
  //APIS
  //https://api.quotable.io/random
  //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=cycling&type=video&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M
  return (
    <Fragment>
      <AppNavBar logout={props.logout} />
      <h3
        style={{
          textAlign: "center",
          textDecorationStyle: "italic",
          color: "grey",
        }}
      >
        <strong>{randomQuote.content}</strong>
      </h3>
      <div>
        
        <BottomScrollListener onBottom={handleScroll} />
        <Grid container xs={12}>
          <Grid
            xs={3}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: "40px",
              marginTop: "30px",
            }}
            container
            item
          >
            {/* <div style={{height:'150px'}}>
            
            </div> */}
            <div style={{ width: "100%" }}>
              <h2> Videos you may like related to your hobby </h2>
            </div>

            {Array.from(hobbyVideos).map((item) => (
              <Paper elevation={3}>
                <iframe
                  width="321"
                  height="315"
                  src={"https://www.youtube.com/embed/" + item.id["videoId"]}
                ></iframe>
              </Paper>
            ))}
          </Grid>
          <Grid
            style={{
              marginTop: "30px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            spacing={3}
            container
            item
            xs={6}
          >
            <div style={{ width: "77%" }}>
              <PostForm
                handlePostsAdd={handlePostsAdd}
                userAuthenticatedId={props.userAuthenticated.userId}
              />
            </div>
            {postss}
          </Grid>
          <Grid
            xs={3}
            style={{
              marginTop: "30px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            spacing={3}
            container
          >
            {/* <div style={{ width: "100%", marginTop: "150px" }}> 
              
            {/* </div> */}
            <h2> Friend Suggestions </h2>
            {Array.from(usersRecommendation).map((user) => (
              <FriendSuggestionCard
                user={user}
                getFriendRecommendations={getFriendRecommendations}
                key={user.id}
                userAuthenticatedId={props.userAuthenticated.userId}
              />
            ))}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default Home;

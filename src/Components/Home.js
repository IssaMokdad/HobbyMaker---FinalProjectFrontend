import React, { Fragment, useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import AppNavBar from "./AppNavBar";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { fetchRequest, api, token } from "./Apis";
import Grid from "@material-ui/core/Grid";
import FriendSuggestionCard from "./FriendSuggestionCard";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import YoutubeVideos from './YoutubeVideos';
import ReactPlayer from 'react-player';
// import Messenger from './Messenger';



const useStyles = makeStyles({
  root: {

    flexGrow:1
  },

});


function Home(props) {
  

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };


  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }


  function success(pos) {
    var crd = pos.coords;
    let data = {
      latitude:crd.latitude,
      longitude:crd.longitude,
      user_id:props.userAuthenticated.userId
    }

    fetchRequest(api + "api/user/save-geometry-position", "post", data).then(
      (response) => {
        if (response.message==='success') {
          
        } else {
          swal("Something went wrong while saving your geometry position!");
        }
      }
    );

  }


  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  const [videoIds, setVideoIds] = useState('')

  const [posts, setPosts] = useState("");

  const [page, setPage] = useState(1);

  const [usersRecommendation, setUsersRecommendations] = useState("");

  const [userAuthenticated, setUserAuthenticated] = useState('')
  const [savedPostIds, setSavedPostIds] = useState('')
  // const [hobbies, setHobbies] = useState('')

  const getUserInfo = () => {
    fetchRequest(api + "api/user/get-info/?user_id=" + props.userAuthenticated.userId, "get").then(
      (response) => {
        if (response.data) {
          setUserAuthenticated(response.data);
          // setHobbies(response.data.hobbies)
          let videoIDs=response.data.videos.map(video=>{
            return video.video_id
          })
          setVideoIds(videoIDs)

          let savedPostIDs=response.data.saved_posts.map(savedpost=>{
            return savedpost.post_id
          })
          setSavedPostIds(savedPostIDs)
        } else {
          swal("Something went wrong!");
        }
      }
    );
  };
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
  // eslint-disable-next-line
  const [hobbyVideos, setHobbyVideos] = useState([{id:{videoId:'OeaZPpZ7k30'}}]);

  //getting a random quote by the following api
  const getRandomQuote = () => {
    fetchRequest("https://api.quotable.io/random", "get").then((response) => {
      setRandomQuote(response);
    });
  };
  //getting hobby videos from youtube related to the hobby of the user, 20 videos
 
  // const getHobbyVideos = ()=>{
  //   if(hobbies && !hobbyVideos){
  //   fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q='+hobbies[0]['hobby']+'&type=video&key=AIzaSyBhlwcvur33Z6dsrw7lx07Ss2gJUbpCvt0').then(response=>response.json()).then(response=>{
  //   setHobbyVideos(response.items)
  //   })}
  // }

  // Youtube APIS
  //AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M
  //AIzaSyBhlwcvur33Z6dsrw7lx07Ss2gJUbpCvt0
  // if(userAuthenticated.hobbies!==undefined && hobbyVideos===''){
  //   fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q='+userAuthenticated.hobbies[0].hobby+'&type=video&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M').then(response=>response.json()).then(response=>{
  //     setHobbyVideos(response.items)
  //   })}


  //On every post add, call getPosts() to get posts latest 5 posts
  const handlePostsAdd = () => {
    getPosts();
  };

  useEffect(() => {
    

    getUserInfo()
    getPosts();
    getFriendRecommendations();
    getRandomQuote();
    navigator.geolocation.getCurrentPosition(success, error, options);
    // getHobbyVideos()
   
  // eslint-disable-next-line  
  }, []);
  
  //making an array of posts and passing getPosts method, post and userid as props
  let postss = Array.from(posts).map((post) => (
    <Grid style={{ width: "80%" }} key={post.id} item>
      <PostCard
        post={post}
        buttonSaveText={savedPostIds.indexOf(props.userAuthenticated.userId)===-1 ? 'Save Post' : 'Unsave Post'}
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

      {/* <Messenger/> */}
      {/* <AppNavBar rTNotification={props.rTNotification} userAuthenticatedId={props.userAuthenticated.userId} logout={props.logout} /> */}
      {/* <Demo /> */}
      {/* <h3
        style={{
          textAlign: "center",
          textDecorationStyle: "italic",
          color: "grey",
        }}
      > */}
        
        {/* <strong>{randomQuote.content}</strong> */}
      {/* </h3> */}
      <div>
        
        <BottomScrollListener onBottom={handleScroll} />
        <div className={classes.root}>
        <Grid container >
      
        <div style={{ position:'absolute', top:'80px', left:'60px',width: "100%" }}>
              <h5><strong> Lastest videos of your hobby</strong> </h5>
            </div>
          <Grid
            xs={3}
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginLeft: "40px",
              marginTop: "10px",
            }}
            container
            item
          >
            {/* <div style={{height:'150px'}}>
            
            </div> */}
            
            {Array.from(hobbyVideos).map(item=>
            <Fragment>
              
               <YoutubeVideos key={item.id.videoId} buttonText={videoIds.indexOf(item.id.videoId)===-1 ? 'Save' : 'Unsave'} userAuthenticatedId={props.userAuthenticated.userId} videoId={item.id["videoId"]} />
               </Fragment>)}
            
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
                userAuthenticated={userAuthenticated}
                handlePostsAdd={handlePostsAdd}
                userAuthenticatedId={props.userAuthenticated.userId}
              />
            </div>
            {postss}
          </Grid>
          <Grid
          item
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
            <h5><strong> Friend Suggestions </strong></h5>
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
      </div>
    </Fragment>
    
  );
}

export default Home;

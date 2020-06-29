import React, { Fragment, useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import PostCard from "./Posts/PostCard";
import PostForm from "./Posts/PostForm";
import TestChat from "./ChatBot";
import { fetchRequest, api } from "./Apis";
import Grid from "@material-ui/core/Grid";
import FriendSuggestionCard from "./Friends/FriendSuggestionCard";
import YoutubeVideos from "./YoutubeVideos/YoutubeVideos";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "1280px",
  },
});

function Home(props) {
  const [progressDisplay, setProgressDisplay] = useState();
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  function success(pos) {
    var crd = pos.coords;
    let data = {
      latitude: crd.latitude,
      longitude: crd.longitude,
      user_id: props.userAuthenticated.userId,
    };

    fetchRequest(api + "api/user/save-geometry-position", "post", data).then(
      (response) => {
        if (response.message === "success") {
        } else {
          swal("Something went wrong while saving your geometry position!");
        }
      }
    );
  }

  const classes = useStyles();

  const [videoIds, setVideoIds] = useState("");

  const [posts, setPosts] = useState("");

  const [page, setPage] = useState(1);

  const [usersRecommendation, setUsersRecommendations] = useState("");

  const [userAuthenticated, setUserAuthenticated] = useState("");

  const [savedPostIds, setSavedPostIds] = useState("");
  // const [hobbies, setHobbies] = useState('')

  const getUserInfo = () => {
    fetchRequest(
      api + "api/user/get-info/?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setUserAuthenticated(response.data);

        let videoIDs = response.data.videos.map((video) => {
          return video.video_id;
        });
        setVideoIds(videoIDs);

        let savedPostIDs = response.data.saved_posts.map((savedpost) => {
          return parseInt(savedpost.post_id);
        });
        setSavedPostIds(savedPostIDs);
      } else {
        swal("Something went wrong!");
      }
    });
  };

  //google calende api:AIzaSyDLrs9tm88-rm1G7Qr81zm578SDh8ejvCY
  //this method is called when we hit the bottom page
  const handleScroll = (event) => {
    setProgressDisplay(1);
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
      if (response.data !== undefined) {
        setPosts(response.data);
        setProgressDisplay("");
      }
    });

  // const [randomQuote, setRandomQuote] = useState("");
  // eslint-disable-next-line
  const [hobbyVideos, setHobbyVideos] = useState([
    { id: { videoId: "8Ch2vBkVUQQ" } },
    { id: { videoId: "8v0TXuLRLeo" } },
    { id: { videoId: "BcqfiDcvnlQ" } },
  ]);

  //getting a random quote by the following api
  // const getRandomQuote = () => {
  //   fetchRequest("https://api.quotable.io/random", "get").then((response) => {
  //     setRandomQuote(response);
  //   });
  // };
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
    getUserInfo();
    getPosts();
    getFriendRecommendations();
    // getRandomQuote();
    navigator.geolocation.getCurrentPosition(success, error, options);

    // eslint-disable-next-line
  }, []);

  //making an array of posts and passing getPosts method, post and userid as props
  let postss = Array.from(posts).map((post) => (
    <Grid style={{ width: "80%" }} key={post.id} item>
      <PostCard
        post={post}
        buttonSaveText={
          savedPostIds.indexOf(post.id) === -1 ? "Save Post" : "Unsave Post"
        }
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
      <BottomScrollListener onBottom={handleScroll} />
      <div className={classes.root}>
        <Grid container>
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "60px",
              width: "70%",
            }}
          >
            <h5>
              <strong> Lastest videos of your hobby</strong>{" "}
            </h5>
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
            {Array.from(hobbyVideos).map((item) => (
              <Fragment key={item.id.videoId}>
                <YoutubeVideos
                  key={item.id.videoId}
                  buttonText={
                    videoIds.indexOf(item.id.videoId) === -1 ? "Save" : "Unsave"
                  }
                  userAuthenticatedId={props.userAuthenticated.userId}
                  videoId={item.id["videoId"]}
                />
              </Fragment>
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
                userAuthenticated={userAuthenticated}
                handlePostsAdd={handlePostsAdd}
                userAuthenticatedId={props.userAuthenticated.userId}
              />
            </div>

            {posts ? (
              postss
            ) : (
              <div style={{ marginTop: "100px", transform: "scale(3)" }}>
                <CircularProgress />
              </div>
            )}
            {progressDisplay && (
              <div
                style={{
                  height: "60px",
                  marginTop: "50px",
                  transform: "scale(2)",
                }}
              >
                <CircularProgress disableShrink={true} color="secondary" />
              </div>
            )}
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
            <h5>
              <strong> Friend Suggestions </strong>
            </h5>
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
        <TestChat userAuthenticatedId={props.userAuthenticated.userId} />
      </div>
    </Fragment>
  );
}

export default Home;

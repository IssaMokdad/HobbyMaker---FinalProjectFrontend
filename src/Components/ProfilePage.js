import React, { Fragment, useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { fetchRequest, api, token } from "./Apis";
import Typography from "@material-ui/core/Typography";
import AppNavBar from "./AppNavBar";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import PostCard from "./PostCard";
import BottomScrollListener from "react-bottom-scroll-listener";
import EditProfile from "./EditProfile";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import FindFriends from "./FindFriends";
import Friends from "./FriendsList";
import FriendRequests from "./FriendRequests";
import PendingRequests from "./PendingRequests"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
    marginLeft: "5%",
    flexGrow: 1,

  },

  media: {
    height: 250,
  },
  button: {
    marginRight: "10px",
  },
});

export default function ProfilePage(props) {
  const classes = useStyles();
  const { userId } = useParams();
  const [user, setUser] = useState("");
  const [friends, setFriends] = useState("");
  const [friendRequests, setFriendRequests] = useState("");
  const [pendingRequests, setPendingRequests] = useState('')
  const [timelineComponent, setTimelineComponent] = useState(1);
  // eslint-disable-next-line
  const [aboutComponent, setAboutComponent] = useState("");
  const [friendsComponent, setFriendsComponent] = useState("");
  const [findFriendsComponent, setFindFriendsComponent] = useState("");
  const [editProfileComponent, setEditProfileComponent] = useState("");
  const [aboutButtonFilled, setAboutButtonFilled] = useState("text");
  const [timelineButtonFilled, setTimelineButtonFilled] = useState("contained");
  const [friendsButtonFilled, setFriendsButtonFilled] = useState("text");
  const [editProfileButtonFilled, setEditProfileButtonFilled] = useState(
    "text"
  );
  const [findFriendsButtonFilled, setFindFriendsButtonFilled] = useState(
    "text"
  );
  const [personAddIconDisplay, setPersonAddIconDisplay] = useState(1);
  const [circularProgress, setCircularProgress] = useState()
  const handleProfilePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addFriend = (event) => {
    setPersonAddIconDisplay('')
    event.preventDefault();
    let data = {
      user_id: props.userAuthenticated.userId,
      friend_id: event.target.id,
    };
    fetchRequest(api + "api/friend/add", "post", data).then((response) => {
      if (response.message === "success") {
        getUserFriends()
      }else{
        setPersonAddIconDisplay(1)
      }
    });
  };

  const getFriendRequests = () => {
    fetchRequest(
      api + "api/friend/get-friend-requests?user_id=" + userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setFriendRequests(response.data);
      }
    });
  };

  const getPendingRequests = () => {
    fetchRequest(
      api + "api/friend/get-pending-requests?user_id=" + userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setPendingRequests(response.data);
      }
    });
  };

  const getUserFriends = () => {
    fetchRequest(api + "api/friend/get-friends?user_id=" + userId, "get").then(
      (response) => {
        if (response.data) {
          setFriends(response.data);
        }
      }
    );
  };

  const handleCoverPhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const profilePictureInput = useRef(null);
  const coverPictureInput = useRef(null);

  const defaultComponentSeen = () => {
    setAboutComponent("");
    setFriendsComponent("");
    setTimelineComponent(1);
    setFindFriendsComponent("");
    setEditProfileComponent("");
    setTimelineButtonFilled("contained");
    setAboutButtonFilled("text");
    setFriendsButtonFilled("text");
    setEditProfileButtonFilled("text");
    setFindFriendsButtonFilled("text");
  };

  const handleComponentChange = (event) => {
    event.preventDefault();

    if (event.target.id === "timelineComponent") {
      setAboutComponent("");
      setFriendsComponent("");
      setTimelineComponent(1);
      setFindFriendsComponent("");
      setEditProfileComponent("");
      setTimelineButtonFilled("contained");
      setAboutButtonFilled("text");
      setFriendsButtonFilled("text");
      setEditProfileButtonFilled("text");
      setFindFriendsButtonFilled("text");
    } else if (event.target.id === "aboutComponent") {
      setAboutComponent(1);
      setFriendsComponent("");
      setTimelineComponent("");
      setFindFriendsComponent("");
      setEditProfileComponent("");
      setTimelineButtonFilled("text");
      setAboutButtonFilled("contained");
      setFriendsButtonFilled("text");
      setEditProfileButtonFilled("text");
      setFindFriendsButtonFilled("text");
    } else if (event.target.id === "friendsComponent") {
      setAboutComponent("");
      setFriendsComponent(1);
      setTimelineComponent("");
      setFindFriendsComponent("");
      setEditProfileComponent("");
      setTimelineButtonFilled("text");
      setAboutButtonFilled("text");
      setFriendsButtonFilled("contained");
      setEditProfileButtonFilled("text");
      setFindFriendsButtonFilled("text");
    } else if (event.target.id === "findFriendsComponent") {
      setAboutComponent("");
      setFriendsComponent("");
      setTimelineComponent("");
      setFindFriendsComponent(1);
      setEditProfileComponent("");
      setTimelineButtonFilled("text");
      setAboutButtonFilled("text");
      setFriendsButtonFilled("text");
      setEditProfileButtonFilled("text");
      setFindFriendsButtonFilled("contained");
    } else if (event.target.id === "editProfileComponent") {
      setAboutComponent("");
      setFriendsComponent("");
      setTimelineComponent("");
      setFindFriendsComponent("");
      setEditProfileComponent(1);
      setTimelineButtonFilled("text");
      setAboutButtonFilled("text");
      setFriendsButtonFilled("text");
      setEditProfileButtonFilled("contained");
      setFindFriendsButtonFilled("text");
    }
  };
  const coverPictureSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("cover_photo", coverPictureInput.current.files[0]);
    formData.append("user_id", props.userAuthenticated.userId);
    fetch(api + "api/user/save-cover-picture", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") {
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
          setCoverPhoto("");
          getUserInfo();
        } else {
          swal("Something went wrong!");
        }
      });
  };

  const profilePictureSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", profilePictureInput.current.files[0]);
    formData.append("user_id", props.userAuthenticated.userId);
    fetch(api + "api/user/save-profile-picture", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") {
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
          setProfilePhoto("");
          getUserInfo();
        } else {
          swal("Something went wrong!");
        }
      });
  };

  const getUserInfo = () => {
    fetchRequest(api + "api/user/get-info/?user-id=" + userId, "get").then(
      (response) => {
        if (response.data) {
          setUser(response.data);
          setFriends(response.data.friends);
          setCircularProgress()
        } else {
          swal("Something went wrong!");
        }
      }
    );
  };

  const [profilePhoto, setProfilePhoto] = useState("");

  const [coverPhoto, setCoverPhoto] = useState("");

  const [posts, setPosts] = useState("");

  const [page, setPage] = useState(1);


  //this method is called when we hit the bottom page

  const handleScroll = (event) => {
    setPage(page + 1);

    getPosts();
  };

  const getPosts = () =>
    fetchRequest(
      api + "api/post/get-user-post?user_id=" + userId + "&page=" + page,
      "get"
    ).then((response) => {
      if (response.data !== undefined) setPosts(response.data);
    });

  let postss;
  if (posts) {
    postss = Array.from(posts).map((post) => (
      <Grid style={{ width: "80%" }} key={post.id} item>
        <PostCard
          post={post}
          getPosts={getPosts}
          userAuthenticatedId={props.userAuthenticated.userId}
        />
      </Grid>
    ));
  }
  let friendsIds = [];
  if (user) {
    friendsIds = user.friends.map((friend) => friend.friend_id);
  }
  useEffect(() => {
    setCircularProgress(1)
    getUserInfo();
    getPosts();
    defaultComponentSeen();
    getUserFriends();
    getFriendRequests();
    getPendingRequests();
    // eslint-disable-next-line
  }, [userId]);


  if(circularProgress){
    return <div style={{position:'absolute', left:'50%', top:'50%'}}><CircularProgress /></div>
  }

  return (
    <Fragment>
      {/* <AppNavBar
        userAuthenticatedId={props.userAuthenticated.userId}
        logout={props.logout}
      /> */}
      <Card className={classes.root}>
        <CardActionArea>
          {coverPhoto !== "" ? (
            <CardMedia
              className={classes.media}
              image={coverPhoto}
              alt='profile'
              title="Contemplative Reptile"
            />
          ) : (
            <CardMedia
              className={classes.media}
              image={api + "images/" + user.cover_photo}
              title="Contemplative Reptile"
            />
          )}
          <CardContent>
            <span style={{ position: "relative", top: "30px" }}>
              <Typography
                align="center"
                gutterBottom
                variant="h5"
                component="h2"
              >
                {user.first_name + " " + user.last_name}
              </Typography>
            </span>

            {profilePhoto === "" ? (
              <img
                width="150"
                height="150"
                alt='profile'
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  left: "44%",
                  bottom: "30px",
                  borderColor: "black",
                  borderWidth: "8px",
                }}
                src={api + "images/" + user.image}
              />
            ) : (
              <img
                width="150"
                height="150"
                alt='cover'
                style={{
                  borderRadius: "50%",
                  position: "absolute",
                  left: "44%",
                  bottom: "30px",
                  borderColor: "black",
                  borderWidth: "8px",
                }}
                src={profilePhoto}
              />
            )}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Grid
            style={{ position: "relative", bottom: "82px", left: "53%" }}
            item
          >
            <input
              ref={profilePictureInput}
              onChange={handleProfilePhotoChange}
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              multiple
              type="file"
            />
            {props.userAuthenticated.userId !== userId &&
            friendsIds.indexOf(parseInt(props.userAuthenticated.userId)) ===
              -1 ? (personAddIconDisplay && 
              <label htmlFor="addFriend">
                <form id={userId} onSubmit={addFriend}>
                  <IconButton type="submit" color="primary">
                    <PersonAddIcon />
                  </IconButton>
                </form>
              </label>
            ) : (
              ""
            )}
            {props.userAuthenticated.userId === userId ? (
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            ) : (
              ""
            )}
          </Grid>
          <Grid
            style={{ position: "relative", bottom: "80px", left: "91%" }}
            item
          >
            <input
              ref={coverPictureInput}
              onChange={handleCoverPhotoChange}
              accept="image/*"
              style={{ display: "none" }}
              id="cover-button-file"
              multiple
              type="file"
            />
            {props.userAuthenticated.userId === userId ? (
              <label htmlFor="cover-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            ) : (
              ""
            )}
          </Grid>

          <Grid
            style={{
              marginTop: "10px",
              justifyContent: "center",
              alignContent: "center",
            }}
            container
          >
            {profilePhoto !== "" ? (
              <div
                style={{ position: "relative", bottom: "90px", left: "110px" }}
              >
                <form onSubmit={profilePictureSubmit}>
                  <IconButton type="submit" aria-label="add to favorites">
                    <SaveIcon />
                  </IconButton>
                </form>
              </div>
            ) : (
              ""
            )}
            {coverPhoto !== "" ? (
              <div
                style={{ position: "relative", bottom: "90px", left: "680px" }}
              >
                <form onSubmit={coverPictureSubmit}>
                  <IconButton type="submit" aria-label="add to favorites">
                    <SaveIcon />
                  </IconButton>
                </form>
              </div>
            ) : (
              ""
            )}
            <form onSubmit={handleComponentChange} id="timelineComponent">
              <Button
                type="submit"
                variant={timelineButtonFilled}
                size="small"
                color="primary"
              >
                Timeline
              </Button>
            </form>

            <form onSubmit={handleComponentChange} id="aboutComponent">
              <Button
                type="submit"
                variant={aboutButtonFilled}
                size="small"
                color="primary"
              >
                About
              </Button>
            </form>

            <form onSubmit={handleComponentChange} id="friendsComponent">
              <Button
                type="submit"
                variant={friendsButtonFilled}
                size="small"
                color="primary"
              >
                Friends
              </Button>
            </form>
            {props.userAuthenticated.userId === userId ? (
              <form onSubmit={handleComponentChange} id="editProfileComponent">
                <Button
                  type="submit"
                  variant={editProfileButtonFilled}
                  size="small"
                  color="primary"
                >
                  Edit Profile
                </Button>
              </form>
            ) : (
              ""
            )}
            {props.userAuthenticated.userId === userId ? (
              <form onSubmit={handleComponentChange} id="findFriendsComponent">
                <Button
                  type="submit"
                  variant={findFriendsButtonFilled}
                  size="small"
                  color="primary"
                >
                  Find Friends
                </Button>
              </form>
            ) : (
              ""
            )}
          </Grid>
        </CardActions>
      </Card>
      <Grid container style={{ marginTop: "30px" }}>
        {timelineComponent && (
          <Fragment>
            <Grid xs={3} item></Grid>
            <Grid
              style={{ justifyContent: "center", alignContent: "center" }}
              xs={6}
              spacing={3}
              item
              container
            >
              {postss}
              <BottomScrollListener onBottom={handleScroll} />
            </Grid>
            <Grid xs={3} item></Grid>
          </Fragment>
        )}
        <Grid className={classes.root} xs={12} item >
          {editProfileComponent && (
            <Card style={{ height: "600px" }}>
              <EditProfile
                userAuthenticatedId={props.userAuthenticated.userId}
                user={user}
                getUserInfo={getUserInfo}
              />
            </Card>
          )}
        </Grid>
        <Grid className={classes.root} xs={12} item >
          {findFriendsComponent && (
            <Card style={{ height: "600px" }}>
              <FindFriends
                userAuthenticatedId={props.userAuthenticated.userId}
                city={user.city}
                getUserInfo={getUserInfo}
              />
            </Card>
          )}
        </Grid>
        {(friendsComponent &&
            props.userAuthenticated.userId === userId) && <Grid style={{display:'flex', minHeight:'600px'}} xs={12} item >
          <Grid item xs={4}>
          <h3 style={{marginLeft:'130px'}}>Pending Requests</h3>
          { 
            Array.from(pendingRequests).map((friend) => (
              
              <div style={{width:'80%', marginLeft:'50px'}}><PendingRequests
                friend={friend}
                getPendingRequests={getPendingRequests}
                key={friend.id}
                userAuthenticatedId={props.userAuthenticated.userId}
              /></div>
            ))} </Grid>
          <Grid item xs={4}>
          <h3 style={{marginLeft:'100px'}}>Friends</h3>
          { 
            Array.from(friends).map((friend) => (
              
              <div style={{width:'80%', marginLeft:'30px'}}><Friends
                friend={friend}
                getUserFriends={getUserFriends}
                key={friend.id}
                userAuthenticatedId={props.userAuthenticated.userId}
              /></div>
            ))}
            </Grid>
            <Grid item xs={4}>
            <h3 style={{marginLeft:'50px'}}>Friend Requests</h3>
            { 
            Array.from(friendRequests).map((friend) => (
              <div style={{width:'80%'}}>
              <FriendRequests
                friend={friend}
                getUserFriends={getUserFriends}
                getFriendRequests={getFriendRequests}
                key={friend.id}
                userAuthenticatedId={props.userAuthenticated.userId}
              /></div>
            ))}
            </Grid>
        </Grid>}
        {(friendsComponent &&
            props.userAuthenticated.userId !== userId) && 
            <Grid item container style={{display:'flex', flexDirection:'column', alignItems:'center'}} xs={12}>
              {Array.from(friends).map((friend) => (
              <Grid item xs={12}>
              <Friends
                friend={friend}
                getUserFriends={getUserFriends}
                key={friend.id}
                userAuthenticatedId={props.userAuthenticated.userId}
              /></Grid>
            ))}
            </Grid>
              }
      </Grid>
    </Fragment>
  );
}

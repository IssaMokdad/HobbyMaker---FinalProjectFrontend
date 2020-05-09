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
import PostForm from "./PostForm";
import BottomScrollListener from "react-bottom-scroll-listener";
import EditProfile from "./EditProfile";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    maxWidth: "90%",
    marginLeft: "5%",
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
  const [timelineComponent, setTimelineComponent] = useState(1);
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

  const handleProfilePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(URL.createObjectURL(event.target.files[0]));
    }
  };


  const handleCoverPhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCoverPhoto(URL.createObjectURL(event.target.files[0]));
    }
  };

  const profilePictureInput = useRef(null);
  const coverPictureInput = useRef(null)

  const handleComponentChange = (event) => {
    console.log(event.target.id);
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
    formData.append('user_id',props.userAuthenticated.userId )
    fetch(api + "api/user/save-cover-picture", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message == "success") {
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
          setCoverPhoto("");
          getUserInfo()
          console.log(response.json);
        } else {
          swal("Something went wrong!");
        }
      });
  };



  const profilePictureSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", profilePictureInput.current.files[0]);
    formData.append('user_id',props.userAuthenticated.userId )
    fetch(api + "api/user/save-profile-picture", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message == "success") {
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
          setProfilePhoto("");
          getUserInfo()
          console.log(response.json);
        } else {
          swal("Something went wrong!");
        }
      });
  };

  const getUserInfo = () => {
    fetchRequest(api + "api/user/get-info/" + "?user-id=" + userId, "get").then(
      (response) => {
        if (response.data) {
          setUser(response.data);
          setFriends(response.data.friends);
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

  const [usersRecommendation, setUsersRecommendations] = useState("");

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

  useEffect(() => {
    getUserInfo();
    getPosts();
    return function cleanup() {
      setProfilePhoto("");
    };
  }, []);

  return (
    <Fragment>
      <AppNavBar
        userAuthenticatedId={props.userAuthenticated.userId}
        logout={props.logout}
      />
      <Card className={classes.root}>
        <CardActionArea>
          {coverPhoto!=='' ? 
          <CardMedia
            className={classes.media}
            image={coverPhoto}
            title="Contemplative Reptile"
          />: <CardMedia
          className={classes.media}
          image='https://images.unsplash.com/photo-1563991522451-90d2395a8854?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
          title="Contemplative Reptile"
        />}
          <CardContent>
            <span style={{ position: "relative", top: "30px" }}>
              <Typography
                align="center"
                gutterBottom
                variant="h5"
                component="h2"
              >
                Lizard
              </Typography>
            </span>

            {profilePhoto === "" ? (
              <img
                width="150"
                height="150"
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
            <label htmlFor="icon-button-file">
              <IconButton
                color="filled"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
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
            <label htmlFor="cover-button-file">
              
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
               <PhotoCamera />
              </IconButton>
            </label>
          </Grid>

          <Grid
            style={{
              marginTop: "10px",
              justifyContent: "center",
              alignContent: "center",
            }}
            xs={12}
            container
          >
            {profilePhoto !== "" ? (
              <div style={{position:'relative', bottom:'90px', left:'110px'}}>
              <form onSubmit={profilePictureSubmit}>
                <IconButton
                  
                  type="submit"
                  aria-label="add to favorites"
                >
                  <SaveIcon />
                </IconButton>
              </form></div>
            ) : (
              ""
            )}
                        {coverPhoto !== "" ? (
              <div style={{position:'relative', bottom:'90px', left:'680px'}}>
              <form onSubmit={coverPictureSubmit}>
                <IconButton
                  
                  type="submit"
                  aria-label="add to favorites"
                >
                  <SaveIcon />
                </IconButton>
              </form></div>
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
          </Grid>
        </CardActions>
      </Card>
      <Grid container style={{ marginTop: "30px" }} xs={12}>
        <Grid xs={3} item></Grid>
        {timelineComponent && (
          <Grid
            style={{ justifyContent: "center", alignContent: "center" }}
            xs={6}
            item
            container
          >
            {postss}
            <BottomScrollListener onBottom={handleScroll} />
          </Grid>
        )}
        <Grid xs={9} style={{ height: "2000px" }} item cotainer>
          {editProfileComponent && (
            <EditProfile user={user} getUserInfo={getUserInfo} />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}

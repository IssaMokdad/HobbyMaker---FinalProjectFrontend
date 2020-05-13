import React, { useEffect, Fragment, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { fetchRequest, api, token } from "./Apis";
import moment from "moment";
import Badge from "./Badge";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import TextField from "@material-ui/core/TextField";
import Card2 from "./Card2";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import Input from "@material-ui/core/Input";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    textField: {
      borderRadius: "20",
    },
  },
  grid: { display: "flex", justifyContent: "center", alignItems: "center" },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  centerText: {
    alignText: "center",
  },
  media: {
    flexShrink: 0,
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginBottom: "12px",
  },
  fileInput: {
    display: "none",
  },

}));

export default function EditPostModal(props) {
  const classes = useStyles();
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileInput(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [postContent, setPostContent] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [marginLeftPost, setMarginLeftPost] = useState('28%')
  const handlePostChange = (event) => {
    if (event.target.value !== "") {
      setMarginLeftPost('0%')
    }

    setPostContent(event.target.value);
  };
  const fileInputs = useRef(null);

  const postSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticatedId));
    formData.append("content", postContent);
    fetch(api + "api/post/create", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        setPostContent("");
        setFileInput("");
        props.handlePostsAdd()
        console.log(response.json);
      });
  };

  return (
    <form id="form1" onSubmit={postSubmit}>
      <Paper elevation={3}>
        <Card>
          <CardContent>
            <Grid container >
              <Grid item style={{ width: "10%" }}>
                <Avatar
                  className={classes.large}
                  src={api + "images/" + props.userAuthenticated.image}
                />
              </Grid>

              <Grid item style={{ width: "85%", marginLeft: "5%" }}>
                <TextField
                  variant="filled"
                  fullWidth
                  // margin='dense'
                  required={true}
                  multiline={true}
                  onChange={handlePostChange}
                  value={postContent}
                  placeholder="What's on your mind?"
                  color="secondary"
                  InputProps={{
                    style: {
                      borderRadius: "25px",
                      textAlign: "center",
                    },
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        children=''
                        style={{ marginLeft: marginLeftPost }}
                      ></InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider variant="fullWidth" light />
          <CardMedia>
            <Grid container >
              <Grid item className={classes.grid} xs={4}>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputs}
                  className={classes.fileInput}
                  id="icon-button-file"
                  type="file"
                />

                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraTwoToneIcon /> Photo
                  </IconButton>
                </label>
              </Grid>
              <Grid item className={classes.grid} xs={4}>
                {fileInput && (
                  <img
                    width="100px"
                    height="60px"
                    className={classes.media}
                    src={fileInput}
                  />
                )}
              </Grid>
              <Grid item className={classes.grid} xs={4}>
                <IconButton
                  type="submit"
                  style={{
                    marginLeft: "40px",
                    transform: "scale(2)",
                  }}
                  type="submit"
                  color="primary"
                  aria-label="upload picture"
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardMedia>
        </Card>
      </Paper>
    </form>
  );
}

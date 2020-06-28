import React, { Fragment, useState, useEffect } from "react";
import swal from "sweetalert";
import { fetchRequest, api } from "../Apis";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import ReactPlayer from "react-player";
export default function YoutubeVideos(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonText, setButtonText] = useState(props.buttonText);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const unsaveVideo = (event) => {
    let data = {
      video_id: event.target.id,
      user_id: props.userAuthenticatedId,
    };

    fetchRequest(api + "api/unsave-video", "post", data).then((response) => {
      if (response.message === "success") {
        if (props.fromSavedVideosComponent) {
          props.getUserInfo();
        } else {
          setButtonText("Save");
          handleClose();
        }
      } else {
        swal("Something went wrong!");
      }
    });
  };

  const saveVideo = (event) => {
    let data = {
      video_id: event.target.id,
      user_id: props.userAuthenticatedId,
    };

    fetchRequest(api + "api/save-video", "post", data).then((response) => {
      if (response.message === "success") {
        setButtonText("Unsave");
        handleClose();
      } else {
        swal("Something went wrong!");
      }
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setButtonText(props.buttonText);
  }, [props.buttonText]);
  return (
    <Fragment>
      {!props.fromSavedVideosComponent ? (
        <IconButton
          color="primary"
          style={{
            position: "relative",
            left: "170px",
            top: "33px",
            transform: "scale(1)",
          }}
          onClick={handleClick}
          aria-label="add to favorites"
        >
          <MoreVertIcon />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          style={{
            position: "relative",
            left: "305px",
            top: "33px",
            transform: "scale(1)",
          }}
          onClick={handleClick}
          aria-label="add to favorites"
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Paper elevation={3}>
        <ReactPlayer
          height="315px"
          width="321px"
          controls={true}
          url={"https://www.youtube.com/watch?v=" + props.videoId}
        />
      </Paper>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          id={props.videoId}
          onClick={buttonText === "Save" ? saveVideo : unsaveVideo}
        >
          {buttonText}
        </MenuItem>
      </Menu>
    </Fragment>
  );
}

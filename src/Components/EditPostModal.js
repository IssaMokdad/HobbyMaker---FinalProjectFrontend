import React, { useRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { fetchRequest, api, token } from "./Apis";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  fileInput: {
    display: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "45%",
    height: "80%",
    overflow: "scroll",

  },
}));

export default function EditPostModal(props) {
  const classes = useStyles();

  const fileInputs = useRef(null);

  const [postContent, setPostContent] = useState("");
  console.log(postContent);
  const handlePostChange = (event) => {
    setPostContent(event.target.value);
  };
  const [fileInput, setFileInput] = useState(null);
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileInput(URL.createObjectURL(event.target.files[0]));
    }
  };
  const editPostSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticatedId));
    formData.append("content", postContent);
    formData.append("post_id",props.post.id )
    fetch(api + "api/post/edit", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.message==='success'){
          swal({
            title: "Edited Successfully!",
            icon: "success",
        });
            props.getPosts();
            props.setOpenPostModal(false)
        }
        else{
            swal('Something went wrong!')
        }
        
      });
  };

  useEffect(() => {
    setPostContent(props.post.content);
    setFileInput(props.url)
  }, [props.post, props.url]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Edit Your Post</h2>

            <form onSubmit={editPostSubmit}>
              <TextField
                variant="filled"
                fullWidth
                required={true}
                multiline
                onChange={handlePostChange}
                value={postContent}
                placeholder="Write a comment"
                color="secondary"
                InputProps={{
                  style: {
                    borderRadius: "25px",
                  },
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        backgroundColor="secondary"
                        variant="filled"
                        color="primary"
                        style={{
                          marginBottom: "15px",
                          transform: "scale(2)",
                        }}
                        type="submit"
                        aria-label="add to favorites"
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <input
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputs}
                className={classes.fileInput}
                id="icon-button-filee"
                type="file"
              />

              <label htmlFor="icon-button-filee">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCameraTwoToneIcon /> Photo
                </IconButton>
              </label>
              <div>
                {fileInput && (
                  <img
                    width="490px"
                    height="276px"
                    className={classes.media}
                    src={fileInput}
                  />
                )}
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

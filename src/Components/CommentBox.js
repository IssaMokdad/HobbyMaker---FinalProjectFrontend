import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { fetchRequest, api } from "./Apis";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  underline: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    }},
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function CommentBox(props) {

  const classes = useStyles()
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => setComment(event.target.value);


  const commentSubmit = (event) => {
    event.preventDefault();
    let data = {
      comment: comment,
      post_id: event.target.id,
      user_id: props.userAuthenticatedId,
    };
    fetchRequest(api+"api/comment/create", "post", data).then(
      (response) => {
        setComment('')
        props.handleChange(response.data)
      }
    );
  };

  return (
    <form id={props.post.id} onSubmit={commentSubmit}>
      <TextField
        variant="filled"
        fullWidth
        required={true}
        multiline
        onChange={handleCommentChange}
        value={comment}
        placeholder="Write a comment"
        color="secondary"
        InputProps={{
            style: {
                borderRadius: '25px'
              },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                variant="filled"
                color="primary"

                style={{
                  marginBottom: "15px",
                  transform: "scale(1)",
                }}
                aria-label="add to favorites"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

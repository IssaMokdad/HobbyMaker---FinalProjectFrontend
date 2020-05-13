import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { fetchRequest, api } from "./Apis";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function CommentBox(props) {
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
                  transform: "scale(2)",
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

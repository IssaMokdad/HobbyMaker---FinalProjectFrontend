import React, { useEffect, Fragment, useState } from "react";
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
import { fetchRequest, api } from "./Apis";
import moment from "moment";
import Badge from "./Badge";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import TextField from "@material-ui/core/TextField";
import Card2 from "./Card2";
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
        console.log(response.data)
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
                type="submit"
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

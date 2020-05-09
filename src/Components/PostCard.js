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
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import CommentBox from "./CommentBox";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CommentsShowModal from "./CommentsShowModal";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import swal from "sweetalert";
import EditPostModal from './EditPostModal';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard(props) {
  const [post, setPost] = useState("");

  const [comments, setComments] = useState("");

  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [openPostModal, setOpenPostModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const getPostAfterDeleteComment = (id)=>{
    // setPost(post)
    // let commentsDetails = Array.from(post).map((comment) => (
    //   <Card2 key={comment.id} userAuthenticatedId={props.userAuthenticatedId} getPostAfterDeleteComment={getPostAfterDeleteComment} content={comment} />
    // ));
    // setComments(commentsDetails);
    fetchRequest(
      api + "api/comment/show/" + "?post-id=" + id,
      "get"
    ).then((response) => {
      let commentsDetails = response.data.map((comment) => (
        <Card2 key={comment.id} userAuthenticatedId={props.userAuthenticatedId} getPostAfterDeleteComment={getPostAfterDeleteComment} content={comment} />
      ));
      setComments(commentsDetails);
      post.comments = response.data
      setPost(post)
      setOpenCommentModal(true);
    });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePostDelete = (event) => {
    setAnchorEl(null);
    let id = event.target.id;

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
          post_id: id,
          user_id: props.userAuthenticatedId,
        };
        fetchRequest(api + "api/post/delete", "POST", data).then((data) => {
          if (data.message == "success") {
            swal({
              title: "Deleted Successfully!",
              icon: "success",
            });

            props.getPosts();
          } else {
            swal({
              title: "Something went wrong, try again!",
            });
          }
        });
      } else {
        swal("Your post is safe!");
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenPostModal = ()=>{ setAnchorEl(null); setOpenPostModal(true);}
  const handleOpenCommentModal = (event) => {
    event.preventDefault();

    fetchRequest(
      api + "api/comment/show/" + "?post-id=" + event.target.id,
      "get"
    ).then((response) => {
      let commentsDetails = response.data.map((comment) => (
        <Card2 key={comment.id} userAuthenticatedId={props.userAuthenticatedId} getPostAfterDeleteComment={getPostAfterDeleteComment} content={comment} />
      ));
      setComments(commentsDetails);
      setOpenCommentModal(true);
    });
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
  };
  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };

  const handleLikeButtonOnclick = (event) => {
    event.preventDefault();
    let data = {
      user_id: props.userAuthenticatedId,
      post_id: event.target.id,
    };

    fetchRequest(api + "api/like/create", "post", data).then((response) => {
      setPost(response.data);
    });
  };

  const handleChangePost = (post) => {
    setPost(post);
  };

  const handleDislikeButtonOnclick = (event) => {
    event.preventDefault();
    let data = {
      user_id: props.userAuthenticatedId,
      post_id: event.target.id,
    };

    fetchRequest(api + "api/like/remove", "post", data).then((response) => {
      setPost(response.data);
    });
  };

  useEffect(() => {
    setPost(props.post);
  }, [props.post]);

  let date = moment(post.created_at).format("LL");
  let url = api + "images/" + post.image;

  const classes = useStyles();
  let handleLike;
  let commentCount;
  let likeCount;
  if (post.likes) {
    let result = post.likes.map((like) => like.user_id);
    likeCount = post.likes.length;
    if (result.indexOf(parseInt(props.userAuthenticatedId)) !== -1) {
      handleLike = (
        <form id={post.id} onSubmit={handleDislikeButtonOnclick}>
          <IconButton type="submit" aria-label="add to favorites">
            <Badge count={likeCount} /> <ThumbUpAltIcon color="primary" />
          </IconButton>
        </form>
      );
    } else {
      likeCount = post.likes.length;
      handleLike = (
        <form id={post.id} onSubmit={handleLikeButtonOnclick}>
          <IconButton type="submit" aria-label="add to favorites">
            <Badge count={likeCount} /> <ThumbUpAltOutlinedIcon />
          </IconButton>
        </form>
      );
    }
  } else {
    handleLike = (
      <form id={post.id} onSubmit={handleLikeButtonOnclick}>
        <IconButton type="submit" aria-label="add to favorites">
          <Badge likeCount={likeCount} />
          <ThumbUpAltOutlinedIcon />
        </IconButton>
      </form>
    );
  }
  let handleComment;
  if (post.comments) {
    commentCount = post.comments.length;

    if (commentCount) {
      handleComment = (
        <form onSubmit={handleOpenCommentModal} id={post.id}>
          <IconButton type="submit" aria-label="add to favorites">
            <Badge count={commentCount} />
            <ChatBubbleIcon color="primary" />
          </IconButton>
        </form>
      );
    }
  }

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  let title;
  if (post.user !== undefined) {
    title = post.user.first_name + " " + post.user.last_name;
  }
  return (
    <div>
      <Paper elevation={3}>
        <Card className={classes.root}>
          <CommentsShowModal
            handleClose={handleCloseCommentModal}
            open={openCommentModal}
            content={comments}
          />
          <EditPostModal
            url={url}
            setOpenPostModal={setOpenPostModal}
            getPosts={props.getPosts}
            userAuthenticatedId={props.userAuthenticatedId}
            handleClose={handleClosePostModal}
            open={openPostModal}
            post={post}
          />
          <Grid container xs={12}>
            <Grid item xs={9}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }

                title={title}
                subheader={date} // June 9 2014
              />
            </Grid>
            <Grid item xs={3}>
              <IconButton
                color="primary"
                style={{
                  marginLeft: "60px",
                  marginTop: "15px",
                  transform: "scale(2)",
                }}
                onClick={handleClick}
                aria-label="add to favorites"
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
          <CardMedia
            className={classes.media}
            image={url}
            title="Paella dish"
          />
          <CardContent>
            <TextField
              margin="normal"
              required={true}
              fullWidth
              disabled={true}
              color="primary"
              // variant='filled'
              fullWidth={true}
              multiline
              // size='small'
              autoComplete="email"
              value={post.content}
              autoFocus
            />

            {/* <Typography paragraph={true} variant="body2" color="textSecondary" classes={{width:'100%', display:'block'}} >
              {post.content}
            </Typography> */}
          </CardContent>
          <div className="ml-3 row">
            {handleLike}
            {handleComment}
          </div>
          <CommentBox
            handleChange={handleChangePost}
            userAuthenticatedId={props.userAuthenticatedId}
            post={post}
          />

          {/* <TextField
    variant="filled"
    width='100%'
    fullWidth
    placeholder="Write a comment"
    color="secondary"
  /> */}
          {/* <TextField
    variant="filled"
    width='100%'
    fullWidth
    placeholder="Write a comment"
    color="secondary"
  /> */}
          {/* <CardActions disableSpacing> */}
          {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
          {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
          {/* </CardActions> */}
          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
        </Card>
      </Paper>

     {props.userAuthenticatedId==props.post.user_id ? <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={post.id} onClick={handlePostDelete}>
          Delete
        </MenuItem>

        <MenuItem  onClick={handleOpenPostModal}>Edit</MenuItem>
      </Menu> : "" }
      {/* <Card2 /> */}
    </div>
  );
}

import React, { useEffect, useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { fetchRequest, api } from "./Apis";
import moment from "moment";
import Badge from "./Badge";
import TextField from "@material-ui/core/TextField";
import Card2 from "./Card2";
import CommentBox from "./CommentBox";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import CommentsShowModal from "./CommentsShowModal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import swal from "sweetalert";
import EditPostModal from "./EditPostModal";

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
}));

export default function PostCard(props) {

  
  const [post, setPost] = useState("");

  const [comments, setComments] = useState("");

  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [openPostModal, setOpenPostModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const getPostAfterDeleteComment = (id) => {
    // setPost(post)
    // let commentsDetails = Array.from(post).map((comment) => (
    //   <Card2 key={comment.id} userAuthenticatedId={props.userAuthenticatedId} getPostAfterDeleteComment={getPostAfterDeleteComment} content={comment} />
    // ));
    // setComments(commentsDetails);
    fetchRequest(api + "api/comment/show/?post_id=" + id, "get").then(
      (response) => {
        let commentsDetails = response.data.map((comment) => (
          <Card2
            key={comment.id}
            userAuthenticatedId={props.userAuthenticatedId}
            getPostAfterDeleteComment={getPostAfterDeleteComment}
            content={comment}
          />
        ));
        setComments(commentsDetails);
        post.comments = response.data;
        setPost(post);
        setOpenCommentModal(true);
      }
    );
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [buttonSaveText, setButtonSaveText] = useState(props.buttonSaveText);
  const [display, setDisplay] = useState();
  const unsavePost = (event) => {
    // if(buttonText==='saved'){
    //     return
    // }

    let data = {
      post_id: event.target.id,
      user_id: props.userAuthenticatedId,
    };

    fetchRequest(api + "api/unsave-post", "post", data).then((response) => {
      if (response.message === "success") {
        setButtonSaveText("Save Post");
        handleClose();
        if(props.fromSavedPostsComponent){
          setDisplay(1)
        }
      } else {
        swal("Something went wrong!");
      }
    });
  };

  const savePost = (event) => {
    // if(buttonText==='saved'){
    //     return
    // }

    let data = {
      post_id: event.target.id,
      user_id: props.userAuthenticatedId,
    };

    fetchRequest(api + "api/save-post", "post", data).then((response) => {
      if (response.message === "success") {
        setButtonSaveText("Unsave Post");
        handleClose();
      } else {
        swal("Something went wrong!");
      }
    });
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
          if (data.message === "success") {
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

  const handleOpenPostModal = () => {
    setAnchorEl(null);
    setOpenPostModal(true);
  };
  const handleOpenCommentModal = (event) => {
    event.preventDefault();

    fetchRequest(
      api + "api/comment/show/?post_id=" + event.target.id,
      "get"
    ).then((response) => {
      let commentsDetails = response.data.map((comment) => (
        <Card2
          key={comment.id}
          userAuthenticatedId={props.userAuthenticatedId}
          getPostAfterDeleteComment={getPostAfterDeleteComment}
          content={comment}
        />
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

  if(display){
    return ''
  }
  return (
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
        <Grid container>
          <Grid item xs={9}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src={api + "images/" + props.post.user.image}
                />
              }


              title={title}
              subheader={date} // June 9 2014
            />
          </Grid>
          <Grid item xs={3}>
            {!props.fromSavedPostsComponent ? (
              <IconButton
                color="primary"
                style={{
                  marginLeft: "60px",
                  marginTop: "15px",
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
                  marginLeft: "60px",
                  marginTop: "15px",
                  transform: "scale(2)",
                }}
                onClick={handleClick}
                aria-label="add to favorites"
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        <CardMedia className={classes.media} image={url} title="Paella dish" />
        <CardContent>
          <TextField
            
            margin="normal"
            required={true}
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

        
      </Card>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {parseInt(props.userAuthenticatedId) === props.post.user_id ? (
          <Fragment>
            <MenuItem id={post.id} onClick={handlePostDelete}>
              Delete
            </MenuItem>

            <MenuItem onClick={handleOpenPostModal}>Edit</MenuItem>
          </Fragment>
        ) : (
          <MenuItem
            id={post.id}
            onClick={buttonSaveText === "Save Post" ? savePost : unsavePost}
          >
            {buttonSaveText}
          </MenuItem>
        )}
      </Menu>
    </Paper>

    // {/* <Card2 /> */}
  );
}

import React, { useEffect, Fragment,  useState } from "react";
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
import { fetchRequest } from "./Apis";
import moment from "moment";
import Badge from "./Badge";
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';

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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard(props) {
  const [post, setPost] = useState("");
  const handleLikeButtonOnclick = (event) => {
    event.preventDefault()
    let data={
      user_id : props.userAuthenticatedId,
      post_id : event.target.id
    }

    fetchRequest("http://localhost:8000/api/like/create", "post", data).then(response=>{
      setPost(response.data)
    })
  };
  const handleDislikeButtonOnclick = (event) => {
    event.preventDefault()
    console.log(event.target.id)
    let data={
      user_id : props.userAuthenticatedId,
      post_id : event.target.id
    }

    fetchRequest("http://localhost:8000/api/like/remove", "post", data).then(response=>{
      setPost(response.data)
    })
  };

  useEffect(() => {
    setPost(props.post);
  }, []);

  let date = moment(post.created_at).format("LL");
  let url = "http://127.0.0.1:8000/images/" + post.image;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  let handleLike
  let commentCount
  let likeCount
  if (post.likes) {
    
    let result = post.likes.map((like) => like.user_id)
    likeCount=post.likes.length
    console.log(likeCount)
    if(result.indexOf(parseInt(props.userAuthenticatedId)) !== -1) {
      handleLike = (
        <Fragment>
        <div className='row'>
          <div className='col-6'>
        <form className='form-inline' id={post.id} onSubmit={handleDislikeButtonOnclick}>
         <IconButton type='submit'
          aria-label="add to favorites"
        >
         <Badge likeCount={likeCount}/>    <ThumbUpAltIcon color="primary" />
        </IconButton> 
        
        </form></div><div className='col-6'>        <form className='form-inline' id={post.id} onSubmit={handleDislikeButtonOnclick}>
         <IconButton type='submit'
          aria-label="add to favorites"
        ><ModeCommentOutlinedIcon /></IconButton> </form></div></div>
        
        </Fragment>
      );
    } else {
      likeCount=post.likes.length
      handleLike = (
        <form id={post.id} onSubmit={handleLikeButtonOnclick}>
        <IconButton type='submit'
          aria-label="add to favorites"
        >
          <Badge likeCount={likeCount}/>   <ThumbUpAltOutlinedIcon />
        </IconButton>
        
        </form>
      );
    }
  } else {
    handleLike = (
      <form id={post.id} onSubmit={handleLikeButtonOnclick}>
      <IconButton type='submit'
        
        aria-label="add to favorites"
      >
        <Badge likeCount={likeCount}/><ThumbUpAltOutlinedIcon />
      </IconButton>
      </form>
    );
  }

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  return (
    <Paper elevation={3}>
      <Card className={classes.root}>
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
          title={post.title}
          subheader={date} // June 9 2014
        />
        <CardMedia className={classes.media} image={url} title="Paella dish" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.content}
          </Typography>
          
        </CardContent>
        {handleLike}

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
  );
}

import React, {useState} from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import ModeComment from "@material-ui/icons/ModeComment";
import Favorite from "@material-ui/icons/Favorite";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";
import { useLabelIconStyles } from "@mui-treasury/styles/icon/label";
import { useRowFlexStyles } from "@mui-treasury/styles/flex/row";
import Grid from "@material-ui/core/Grid";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import swal from "sweetalert";
import {fetchRequest, api} from './Apis';

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    display: "flex",
    padding: spacing(2),
    borderRadius: 16,
  },
  media: {
    minWidth: "25%",
    maxWidth: "25%",
    flexShrink: 0,
    backgroundColor: palette.grey[200],
    borderRadius: 12,
    boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
  },
  rating: {
    verticalAlign: "text-top",
  },
  content: {
    padding: spacing(0, 2, 0, 0),
    overflow: "scroll",
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginBottom: 0,
    marginRight: spacing(1.5),
    display: "inline-block",
  },
  body: {
    fontSize: 14,
    color: palette.grey[500],
  },
  divider: {
    margin: spacing(1, 0),
  },
  textFooter: {
    fontSize: 14,
  },
  icon: {
    fontSize: "1.2rem",
    verticalAlign: "bottom",
  },
}));

const Card2 = (props) => {
  const styles = useStyles();

  const gutterStyles = usePushingGutterStyles({ space: 1.5 });

  const labelStyles = useLabelIconStyles({ linked: true });

  const [anchorEl, setAnchorEl] = useState(null);

  const flexStyles = useRowFlexStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCommentDelete = (event) => {
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
          post_id : props.content.post_id,
          id: id,
          user_id: props.userAuthenticatedId,
        };
        fetchRequest(api + "api/comment/remove", "POST", data).then((response) => {
          if (response.data) {
            props.getPostAfterDeleteComment(response.data)
            swal({
              title: "Deleted Successfully!",
              icon: "success",
            });

            
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Card className={styles.card} elevation={0}>
      <Grid container xs={12}>
        <Grid xs={9} item>
          <CardContent className={styles.content}>
            
            <Box mb={1}>
              <Grid xs={12} container>
                <Grid item xs={10} >
              <h3 className={styles.heading}>
                {props.content.user.first_name +
                  " " +
                  props.content.user.last_name}{" "}
              </h3>
              </Grid>
              <Grid xs={2} item>
              <IconButton
          color="primary"

          onClick={handleClick}
          aria-label="add to favorites"
        >
          <MoreVertIcon />
        </IconButton>
              </Grid>
              </Grid>
              <Grid/>
              {/* <Rating
            name={'rating'}
            value={2}
            className={styles.rating}
            size={'small'}
          /> */}
            </Box>

            <p className={styles.body}>{props.content.comment}</p>

            <Divider className={styles.divider} light />

            {/* <div className={flexStyles.parent}> */}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            {/* <Link
            className={cx(labelStyles.primaryLink, styles.textFooter)}
            component={'button'}
          >
            Read more <ArrowForwardIos className={labelStyles.icon} />
          </Link> */}
            {/* <div
            className={cx(
              flexStyles.rightChild,
              flexStyles.parent,
              gutterStyles.parent
            )}
          >
            <button type={'button'} className={labelStyles.link}>
              <ModeComment className={labelStyles.icon} /> 135
            </button>
            <button type={'button'} className={labelStyles.link}>
              <Favorite className={labelStyles.icon} /> 12
            </button>
          </div> */}
            {/* </div> */}

          </CardContent>
        </Grid>
        {/* <Grid item xs={3}> */}
        

        <CardMedia
          className={styles.media}
          image={
            "https://www.brighttv.co.th/wp-content/uploads/2018/04/29739332_996623360491913_2322116227981377536_n.jpg"
          }
        />
        {/* </Grid> */}
        
      </Grid>
      <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleCommentDelete} id={props.content.id} >
        Delete
      </MenuItem>

      <MenuItem >Edit</MenuItem>
    </Menu>
    </Card>

  );
};

export default Card2;

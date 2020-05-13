import React, { useState, useEffect } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { fetchRequest, api } from "./Apis";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: "flex",
      padding: spacing(2),
      minWidth: 288,
      marginBottom: "20px",
      borderRadius: 12,
      boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
      "& > *:nth-child(1)": {
        marginRight: spacing(2),
      },
      "& > *:nth-child(2)": {
        flex: "auto",
      },
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: "1px",
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});

const PendingRequests = (props) => {
  const styles = useStyles();

  const [age, setAge] = useState("");

  const calculateAge = () => {
    let today = new Date();
    var birthDate = new Date(props.friend.birthday); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    setAge(age_now);
  };

  const removeFriend = (event) => {
    let friendId = event.target.id;
    event.preventDefault();
    swal({
      title: "Are you sure you want to cancel this request?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
          friend_id: friendId,
          user_id: props.userAuthenticatedId,
        };
        fetchRequest(api + "api/friend/remove", "post", data).then(
          (response) => {
            if (response.message === "success") {
              swal({
                title: "This request canceled successfully!",
                icon: "success",
              });

              props.getPendingRequests();
            } else {
              swal({
                title: "Something went wrong, try again!",
              });
            }
          }
        );
      } else {
        swal("Your request is safe!");
      }
    });
  };

  useEffect(() => {
    calculateAge();
    // eslint-disable-next-line
  }, []);

  return (
    <Card className={cx(styles.card)} elevation={2}>
      <Avatar
        src={api + "images/" + props.friend.image}
        className={styles.avatar}
      />

      <Box>
        <h3 className={styles.heading}>
          <Link to={"/profile/" + props.friend.friend_id}>
            {" "}
            {props.friend.first_name + " " + props.friend.last_name}
          </Link>
        </h3>
        <p className={styles.subheader}>{age + " years old"}</p>
        <Box display={"flex"} alignItems={"center"}>
          {/* <Slider classes={sliderStyles} defaultValue={30} /> */}
          {/* <span className={styles.value}>3/10</span> */}
        </Box>
      </Box>
      {parseInt(props.userAuthenticatedId) === props.friend.user_id ? (
        <form id={props.friend.friend_id} onSubmit={removeFriend}>
          <IconButton type="submit">
            <HighlightOffIcon color="secondary" />
          </IconButton>
        </form>
      ) : (
        ""
      )}
    </Card>
  );
};

export default PendingRequests;

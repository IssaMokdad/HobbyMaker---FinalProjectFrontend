import "date-fns";
import React, { useState, useRef, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { fetchRequest, api, token } from "./Apis";
import swal from "sweetalert";
import InviteFriend from "./InviteFriend";
import InviteFriendsModal from "./InviteFriendsModal";
import moment from "moment";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  // The first commit of Material-UI
  const [events, setEvents] = useState();
  const [createdEventsDisplay, setCreatedEventsDisplay] = useState(1)
  const [editDisplay, setEditDisplay] = useState()
  const [friends, setFriends] = useState("");

  const [openInviteFriendModal, setOpenInviteFriendModal] = useState(false);
  const handleCloseInviteFriendModal = () => {
    setOpenInviteFriendModal(false);
  };
  const handleOpenInviteFriendModal = () => {
    setOpenInviteFriendModal(true);
  };


  const getUserFriends = () => {
    fetchRequest(
      api + "api/friend/get-friends?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setFriends(response.data);
      }
    });
  };

  const getUserEvents = () => {
    fetchRequest(
      api + "api/get-user-events?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
       setEvents(response.data);
      }
    });
  };



  useEffect(() => {
    getUserFriends();
    getUserEvents();
  }, []);

  return (
    <div  className='container'>{events && events.map((event) => 
    <Fragment><EventCard 
        eventDescription={event.description}
        eventName={event.name}
        id={event.id}
        getUserEvents={getUserEvents}
        fromCreatedEventsComponent={1}
        key={event.id}
        selectedStartTime={event.start_time}
        selectedEndTime={event.end_time}
        selectedStartDate={event.start_date}
        selectedEndDate={event.end_date}
        location={event.location}
        faces={event.going}
        userAuthenticatedId={props.userAuthenticated.userId}
        image={api + "images/" + event.image} />
         
            
         <InviteFriendsModal
         handleClose={handleCloseInviteFriendModal}
         open={openInviteFriendModal}
         friends={friends}
       /> 

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginLeft: "450px" }}
              startIcon={<AddCircleIcon />}
              onClick={handleOpenInviteFriendModal}
            >
              Invite Friends
            </Button> </Fragment>
       )}
</div>
  );
}

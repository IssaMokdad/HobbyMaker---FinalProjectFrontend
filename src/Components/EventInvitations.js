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
  const [display, setDisplay] = useState()
  const [notInvitedFriends, setNotInvitedFriends] = useState("");

  const acceptInvitation = (event) => {
    event.preventDefault()
    let event_id = event.target.id
    let data = {
        'event_id':event_id,
        user_id:props.userAuthenticated.userId
    }
    
    fetchRequest(
      api + "api/accept-event-invitation", "POST", data
    ).then((response) => {
      if (response.message==='success') {
        setDisplay(1)
      }
    });
  };



  const refuseInvitation = (event) => {
    event.preventDefault()
    let event_id = event.target.id
    let data = {
        'event_id':event_id,
        user_id:props.userAuthenticated.userId
    }
    fetchRequest(
      api + "api/refuse-event-invitation","POST", data
    ).then((response) => {
      if (response.message==='success') {
        setDisplay(1)
      }
    });
  };

  const getEventsInvitations = () => {
    fetchRequest(
      api + "api/get-user-events-invitations?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
       setEvents(response.data);
      }
    });
  };



  useEffect(() => {
    // getUserFriends();
    getEventsInvitations();
  }, []);
  if(display){
      return ""
  }
  return (
    <div style={{marginTop:'45px'}} className='container'>{events && events.map((event) => 
    <Fragment><EventCard 
        eventDescription={event.description}
        eventName={event.name}
        id={event.id}
        fromInvitationsComponent={1}
        key={event.id}
        selectedStartTime={event.start_time}
        selectedEndTime={event.end_time}
        selectedStartDate={event.start_date}
        selectedEndDate={event.end_date}
        location={event.location}
        faces={event.going}
        userAuthenticatedId={props.userAuthenticated.userId}
        image={api + "images/" + event.image} />
         
            


            <form onSubmit={acceptInvitation} id={event.id}><Button
              
              variant="contained"
              color="primary"
              type='submit'
              style={{ marginTop: "20px",width:'115px', marginLeft: "400px"}}
             
            >
              Going
            </Button> </form>
            <form onSubmit={refuseInvitation} id={event.id}><Button
              
              variant="contained"
              color="secondary"
              type='submit'
              style={{ postition:'relative',bottom:'35px', left: "550px" }}
             
            >
              Not Going
            </Button> </form></Fragment>
       )}
</div>
  );
}

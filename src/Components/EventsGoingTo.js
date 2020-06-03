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


  const cancelInvitation = (event) => {
    event.preventDefault()
    let id = event.target.id;

    swal({
      title: "Are you sure you don't want to go anymore?",
    //   text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
        event_id: id,
        user_id: props.userAuthenticated.userId,
        };
        fetchRequest(api + "api/refuse-event-invitation", "POST", data).then((data) => {
          if (data.message === "success") {


            getEventsGoingTo()
          } else {
            swal({
              title: "Something went wrong, try again!",
            });
          }
        });
      } else {
        swal("Your are going to this event!");
      }
    });
  };
//   const cancelInvitation = (event) => {
//     event.preventDefault()
//     let event_id = event.target.id
//     fetchRequest(
//       api + "api/refuse-event-invitation?user_id=" + props.userAuthenticated.userId + "&event_id=" + event_id,
//       "get"
//     ).then((response) => {
//       if (response.message==='success') {
//         setDisplay(1)
//       }
//     });
//   };

  const getEventsGoingTo = () => {
    fetchRequest(
      api + "api/get-user-events-going-to?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
       setEvents(response.data);
      }
    });
  };



  useEffect(() => {
    // getUserFriends();
    getEventsGoingTo()
  }, []);

  return (
    <div style={{marginTop:'45px'}} className='container'>{events && events.map((event) => 
    <Fragment><EventCard 
        eventDescription={event.description}
        eventName={event.name}
        id={event.id}
        key={event.id}
        selectedStartTime={event.start_time}
        selectedEndTime={event.end_time}
        selectedStartDate={event.start_date}
        selectedEndDate={event.end_date}
        location={event.location}
        faces={event.going}
        userAuthenticatedId={props.userAuthenticated.userId}
        image={api + "images/" + event.image} />
         
            


            <form onSubmit={cancelInvitation} id={event.id}><Button
              
              variant="contained"
              color="secondary"
              type='submit'
              style={{marginBottom:'20px', marginTop: "20px",width:'380px', marginLeft: "360px"}}
             
            >
              I don't want to go
            </Button> </form>
</Fragment>
       )}
</div>
  );
}

import React, { useState, useRef, useEffect, Fragment } from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { fetchRequest, api, token } from "../Apis";
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
  const [createdEventsDisplay, setCreatedEventsDisplay] = useState(1);
  const [display, setDisplay] = useState();
  const [notInvitedFriends, setNotInvitedFriends] = useState("");
  const [seen, setSeen] = useState("");

  const joinPublicEvent = (event) => {
    event.preventDefault();
    let event_id = event.target.id;
    let data = {
      event_id: event_id,
      user_id: props.userAuthenticated.userId,
    };

    fetchRequest(api + "api/join-event", "POST", data).then((response) => {
      if (response.message === "success") {
        setDisplay(1);
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

  const getPublicEvents = () => {
    fetchRequest(
      api + "api/get-public-events?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data.length) {
        setEvents(response.data);
        // props.getUserEvents()
        setSeen(1);
      } else {
        setEvents(null);
        setSeen(1);
      }
    });
  };

  useEffect(() => {
    // getUserFriends();
    getPublicEvents();
  }, []);
  if(display){
      return(<div><strong>You joined the event, We hope you will have fun!</strong></div>)
  }
  return (
    // style={{marginTop:'45px'}}
    <div>
      {events &&
        events.map((event) => (
          <Fragment>
            <EventCard
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
              image={api + "images/" + event.image}
            />

            <form onSubmit={joinPublicEvent} id={event.id}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                style={{
                  marginTop: "20px",
                  marginBottom: "47px",
                  marginLeft: "80px",
                }}
              >
                I want to go
              </Button>{" "}
            </form>
          </Fragment>
        ))}
    </div>
  );
}

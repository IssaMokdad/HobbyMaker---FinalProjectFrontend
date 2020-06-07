import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CreateEvent from './CreateEvent';
import CreatedEvents from './CreatedEvents';
import EventInvitations from './EventInvitations';
import EventsGoingTo from './EventsGoingTo';
export default function Events(props) {
  const [createEventComponent, setCreateEventComponent] = useState("");
  const [eventsYouCreatedComponent, setEventsYouCreatedComponent] = useState(
    1
  );
  const [eventsYouAreGoingTo, setEventsYouAreGoingTo] = useState("");
  const [invitationsByFriends, setInvitationsByFriends] = useState("");
  const [nearbyEvents, setNearByEvents] = useState("");

  const handleComponentChange = (event) => {
    event.preventDefault();

    if (event.target.id === "createEventComponent") {
      setCreateEventComponent(1);
      setEventsYouCreatedComponent("");
      setEventsYouAreGoingTo("");
      setInvitationsByFriends("");
      setNearByEvents("");
    } else if (event.target.id === "eventsYouCreatedComponent") {
      setCreateEventComponent("");
      setEventsYouCreatedComponent(1);
      setEventsYouAreGoingTo("");
      setInvitationsByFriends("");
      setNearByEvents("");
    } else if (event.target.id === "invitationsByFriends") {
      setCreateEventComponent("");
      setEventsYouCreatedComponent("");
      setEventsYouAreGoingTo("");
      setInvitationsByFriends(1);
      setNearByEvents("");
    } else if (event.target.id === "nearbyEvents") {
      setCreateEventComponent("");
      setEventsYouCreatedComponent("");
      setEventsYouAreGoingTo("");
      setInvitationsByFriends("");
      setNearByEvents(1);
    }
    else if (event.target.id === "eventsYouAreGoingTo") {
        setCreateEventComponent("");
        setEventsYouCreatedComponent("");
        setEventsYouAreGoingTo(1);
        setInvitationsByFriends("");
        setNearByEvents("");
      }
  };
  return (

    <div style={{marginTop:'30px'}} className="container">
        <div className='row justify-content-center'>
        
      <form onSubmit={handleComponentChange} id="createEventComponent">
        <Button
          type="submit"
          variant="contained"
          style={{marginRight:'40px'}}
          size="small"
          color={createEventComponent ? 'secondary' : ''}
        >
          <strong>Create Event</strong>
        </Button>
      </form>
      
      <form onSubmit={handleComponentChange} id="eventsYouCreatedComponent">
        <Button
          type="submit"
          variant="contained"
          style={{marginRight:'40px'}}
          size="small"
          color={eventsYouCreatedComponent ? 'secondary' : ''}
        >
          <strong>Events</strong>
        </Button>
      </form>
      
      {/* <form onSubmit={handleComponentChange} id="invitationsByFriends">
        <Button
          type="submit"
          variant="contained"
          size="small"
          style={{marginRight:'40px'}}
          color={invitationsByFriends ? 'primary' : ''}
        >
          <strong>Invitations</strong>
        </Button>
      </form> */}
      
      {/* <form onSubmit={handleComponentChange} id="nearbyEvents">
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{marginRight:'40px'}}
          color={nearbyEvents ? 'primary' : ''}
        >
          <strong>Nearby Events</strong>
        </Button>
      </form> */}
      {/* <form onSubmit={handleComponentChange} id="eventsYouAreGoingTo">
        <Button
          type="submit"
          variant="contained"
          size="small"
          style={{marginRight:'40px'}}
          color={eventsYouAreGoingTo ? 'primary' : ''}
        >
          <strong>Events You Are Going To</strong>
        </Button>
      </form> */}
    </div>
    {createEventComponent && <CreateEvent userAuthenticated={props.userAuthenticated} />}
    {eventsYouCreatedComponent && <CreatedEvents handleComponentChange={handleComponentChange} userAuthenticated={props.userAuthenticated} />}
    {/* {invitationsByFriends && <EventInvitations userAuthenticated={props.userAuthenticated} />}
    {eventsYouAreGoingTo && <EventsGoingTo userAuthenticated={props.userAuthenticated} />} */}
    </div>
    
  );
}

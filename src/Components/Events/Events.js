import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CreateEvent from "./CreateEvent";
import CreatedEvents from "./CreatedEvents";
export default function Events(props) {
  const [createEventComponent, setCreateEventComponent] = useState("");
  const [eventsYouCreatedComponent, setEventsYouCreatedComponent] = useState(1);


  const handleComponentChange = (event) => {
    event.preventDefault();

    if (event.target.id === "createEventComponent") {
      setCreateEventComponent(1);
      setEventsYouCreatedComponent("");
    } else if (event.target.id === "eventsYouCreatedComponent") {
      setCreateEventComponent("");
      setEventsYouCreatedComponent(1);
    } 
  };
  return (
    <div style={{ marginTop: "30px" }} className="container">
      <div className="row justify-content-center">
        <form onSubmit={handleComponentChange} id="createEventComponent">
          <Button
            type="submit"
            variant="contained"
            style={{ marginRight: "40px" }}
            size="small"
            color={createEventComponent ? "secondary" : ""}
          >
            <strong>Create Event</strong>
          </Button>
        </form>

        <form onSubmit={handleComponentChange} id="eventsYouCreatedComponent">
          <Button
            type="submit"
            variant="contained"
            style={{ marginRight: "40px" }}
            size="small"
            color={eventsYouCreatedComponent ? "secondary" : ""}
          >
            <strong>Events</strong>
          </Button>
        </form>
      </div>
      {createEventComponent && (
        <CreateEvent userAuthenticated={props.userAuthenticated} />
      )}
      {eventsYouCreatedComponent && (
        <CreatedEvents
          handleComponentChange={handleComponentChange}
          userAuthenticated={props.userAuthenticated}
        />
      )}
    </div>
  );
}

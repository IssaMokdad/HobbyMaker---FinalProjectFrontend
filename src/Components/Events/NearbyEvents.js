import React, { useState, useEffect, Fragment } from "react";
import "date-fns";
import { fetchRequest, api } from "../Apis";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  const [events, setEvents] = useState();
  const [display, setDisplay] = useState();
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

  const getPublicEvents = () => {
    fetchRequest(
      api + "api/get-public-events?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data.length) {
        setEvents(response.data);
        setSeen(1);
      } else {
        setEvents(null);
        setSeen(1);
      }
    });
  };

  useEffect(() => {
    getPublicEvents();
  }, []);
  if (display) {
    return (
      <div>
        <strong>You joined the event, We hope you will have fun!</strong>
      </div>
    );
  }
  return (
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
      {!events && (
        <div>
          <strong>There are no nearby public events</strong>
        </div>
      )}
    </div>
  );
}

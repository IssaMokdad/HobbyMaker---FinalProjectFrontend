import React, { useState,  useEffect } from "react";
import "date-fns";
import { fetchRequest, api } from "../Apis";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  const [events, setEvents] = useState();
  const [seen, setSeen] = useState("");
  const acceptInvitation = (event) => {
    event.preventDefault();

    let eventId = event.target.id;
    let data = {
      event_id: eventId,
      user_id: props.userAuthenticated.userId,
    };

    fetchRequest(api + "api/accept-event-invitation", "POST", data).then(
      (response) => {
        if (response.message === "success") {
          getEventsInvitations();
          props.handleInitiate();
        }
      }
    );
  };

  const refuseInvitation = (event) => {
    event.preventDefault();
    let eventId = event.target.id;
    let data = {
      event_id: eventId,
      user_id: props.userAuthenticated.userId,
    };
    fetchRequest(api + "api/refuse-event-invitation", "POST", data).then(
      (response) => {
        if (response.message === "success") {
          getEventsInvitations();
        }
      }
    );
  };

  const getEventsInvitations = () => {
    fetchRequest(
      api +
        "api/get-user-events-invitations?user_id=" +
        props.userAuthenticated.userId,
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
    getEventsInvitations();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {events ? (
        <h1 style={{ textAlign: "center" }}>
          {seen && <strong>Invitations</strong>}
        </h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          {seen && <strong>You have no invitations</strong>}
        </h1>
      )}
      {events &&
        events.map((event) => (
          <div>
            <EventCard
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
              privacy={event.privacy}
              userAuthenticatedId={props.userAuthenticated.userId}
              image={api + "images/" + event.image}
            />

            <div
              style={{ marginLeft: "47px", marginTop: "20px" }}
              className="row"
            >
              <div>
                <form onSubmit={acceptInvitation} id={event.id}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ width: "115.72px", marginBottom: "47px" }}
                  >
                    Going
                  </Button>{" "}
                </form>
              </div>
              <div style={{ marginLeft: "20px", marginBottom: "47px" }}>
                <form onSubmit={refuseInvitation} id={event.id}>
                  <Button variant="contained" color="secondary" type="submit">
                    Not Going
                  </Button>{" "}
                </form>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

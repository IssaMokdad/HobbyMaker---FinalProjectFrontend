import React, { useState,  useEffect, Fragment } from "react";
import "date-fns";
import { fetchRequest, api} from "../Apis";
import swal from "sweetalert";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  const [events, setEvents] = useState();
  const [seen, setSeen] = useState("");

  const cancelInvitation = (event) => {
    event.preventDefault();
    let id = event.target.id;

    swal({
      title: "Are you sure you don't want to go anymore?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
          event_id: id,
          user_id: props.userAuthenticated.userId,
        };
        fetchRequest(api + "api/refuse-event-invitation", "POST", data).then(
          (data) => {
            if (data.message === "success") {
              getEventsGoingTo();
              props.getUserEvents();
            } else {
              swal({
                title: "Something went wrong, try again!",
              });
            }
          }
        );
      } else {
        swal("Your are going to this event!");
      }
    });
  };

  const getEventsGoingTo = () => {
    fetchRequest(
      api +
        "api/get-user-events-going-to?user_id=" +
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
    getEventsGoingTo();
    // eslint-disable-next-line
  }, [props.initiate]);

  return (
    <div>
      {events ? (
        <h1 style={{ textAlign: "center" }}>
          {seen && <strong>Going To</strong>}
        </h1>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          {seen && <strong>You don't have going events</strong>}
        </h1>
      )}
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
              privacy={event.privacy}
              userAuthenticatedId={props.userAuthenticated.userId}
              image={api + "images/" + event.image}
            />

            <form onSubmit={cancelInvitation} id={event.id}>
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
                I don't want to go
              </Button>{" "}
            </form>
          </Fragment>
        ))}
    </div>
  );
}

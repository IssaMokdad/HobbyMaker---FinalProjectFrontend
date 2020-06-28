import React, { useState, useEffect, Fragment } from "react";
import "date-fns";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { fetchRequest, api } from "../Apis";
import InviteFriendsModal from "./InviteFriendsModal";
import EventInvitations from "./EventInvitations";
import EventsGoingTo from "./EventsGoingTo";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  const [initiate, setInitiate] = useState(0);
  const [events, setEvents] = useState();
  const [notInvitedFriends, setNotInvitedFriends] = useState("");
  const [seen, setSeen] = useState("");
  const [openInviteFriendModal, setOpenInviteFriendModal] = useState(false);
  const handleCloseInviteFriendModal = () => {
    setOpenInviteFriendModal(false);
  };
  const handleOpenInviteFriendModal = () => {
    setOpenInviteFriendModal(true);
  };
  const [openId, setOpenId] = useState("");
  const handleInitiate = () => {
    setInitiate(initiate + 1);
  };
  const getNotInvitedFriends = (event) => {
    let event_id = event.target.id;
    handleOpenInviteFriendModal();
    setOpenId(event_id);
    event.preventDefault();

    fetchRequest(
      api +
        "api/not-invited-friends?user_id=" +
        props.userAuthenticated.userId +
        "&event_id=" +
        event_id,
      "get"
    ).then((response) => {
      if (response.data) {
        setNotInvitedFriends(response.data);
      }
    });
  };

  const getUserEvents = () => {
    fetchRequest(
      api + "api/get-user-events?user_id=" + props.userAuthenticated.userId,
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
    getUserEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ">
          <h1
            style={{ textAlign: "center", position: "relative", top: "48px" }}
          >
            {seen && (
              <strong>
                {events
                  ? "Created Events"
                  : "You have no created events, create one!"}
              </strong>
            )}
          </h1>
          {events ? (
            events.map((event) => (
              <Fragment>
                <EventCard
                  eventDescription={event.description}
                  eventName={event.name}
                  id={event.id}
                  getUserEvents={getUserEvents}
                  fromCreatedEventsComponent={1}
                  key={event.id}
                  privacy={event.privacy}
                  handleInitiate={handleInitiate}
                  selectedStartTime={event.start_time}
                  selectedEndTime={event.end_time}
                  selectedStartDate={event.start_date}
                  selectedEndDate={event.end_date}
                  location={event.location}
                  faces={event.going}
                  userAuthenticatedId={props.userAuthenticated.userId}
                  image={api + "images/" + event.image}
                />
                <form onSubmit={getNotInvitedFriends} id={event.id}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "20px", marginLeft: "25%" }}
                    startIcon={<AddCircleIcon />}
                  >
                    Invite Friends
                  </Button>{" "}
                </form>
                <InviteFriendsModal
                  handleClose={handleCloseInviteFriendModal}
                  open={
                    parseInt(openId) === parseInt(event.id) &&
                    openInviteFriendModal
                  }
                  eventId={event.id}
                  openInviteModal={openInviteFriendModal}
                  userAuthenticatedId={props.userAuthenticated.userId}
                  friends={notInvitedFriends}
                />{" "}
              </Fragment>
            ))
          ) : (
            <div>
              {seen && (
                <form
                  onSubmit={props.handleComponentChange}
                  id="createEventComponent"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: "80px", marginLeft: "110px" }}
                    size="small"
                    color="secondary"
                  >
                    <strong>Create One</strong>
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
        <div style={{ marginTop: "48px" }} className="col-4">
          <EventInvitations
            handleInitiate={handleInitiate}
            userAuthenticated={props.userAuthenticated}
          />
        </div>
        <div style={{ marginTop: "48px" }} className="col-4">
          <EventsGoingTo
            getUserEvents={getUserEvents}
            handleInitiate={handleInitiate}
            initiate={initiate}
            userAuthenticated={props.userAuthenticated}
          />
        </div>
      </div>
    </div>
  );
}

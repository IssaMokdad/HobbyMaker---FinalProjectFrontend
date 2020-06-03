import "date-fns";
import React, { useState, useRef, useEffect } from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
export default function CreateEvent(props) {
  // The first commit of Material-UI
  const [selectedStartDate, setSelectedStartDate] = useState(null);
    moment(new Date()).format("YYYY-MM-DD")
  
  const [selectedEndDate, setSelectedEndDate] = useState(null);
    // moment(new Date()).format("YYYY-MM-DD")
  
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [location, setLocation] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  };
  const handleStartDateChange = (date) => {
    setSelectedStartDate(moment(date).format("YYYY-MM-DD"));
  };
  const [fileInput, setFileInput] = useState(null);
  const [friends, setFriends] = useState("");
  const handleEndDateChange = (date) => {
    setSelectedEndDate(moment(date).format("YYYY-MM-DD"));
  };

  const handleStartTimeChange = (date) => {
    setSelectedStartTime(date);
  };

  const handleEndTimeChange = (date) => {
    setSelectedEndTime(date);
  };
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFileInput(URL.createObjectURL(event.target.files[0]));
    }
  };
  const fileInputs = useRef(null);


  const eventCreateSubmit = (event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticated.userId));
    formData.append("description", eventDescription);
    formData.append("name", eventName);
    formData.append("start_date", selectedStartDate);
    formData.append("end_date", selectedEndDate);
    formData.append("start_time", selectedStartTime);
    // moment(selectedStartTime).format('LT')
    formData.append("end_time", selectedEndTime);
    formData.append("location", location);
    fetch(api + "api/event-create", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") {
          swal({
            title: "Created Successfully!",
            icon: "success",
          });

          setEventDescription("");
          setLocation("");
          setEventName("");
          setSelectedEndDate(null);
          setSelectedStartTime(null);
          setSelectedEndTime(null);
          setSelectedStartDate(null);
          setFileInput("");
        }
      });
  };
//using this component for creating and editing
  const eventEditSubmit = () => {
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticatedId));
    formData.append("description", eventDescription);
    formData.append("event_id", props.eventId);
    formData.append("name", eventName);
    formData.append("start_date", selectedStartDate);
    formData.append("end_date", selectedEndDate);
    formData.append("start_time", selectedStartTime);
    // moment(selectedStartTime).format('LT')
    formData.append("end_time", selectedEndTime);
    formData.append("location", location);
    fetch(api + "api/event-edit", {
      method: "POST",
      headers: token,
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === "success") {
          props.getUserEvents()
          swal({
            title: "Edited Successfully!",
            icon: "success",
          });

          
        }
      });
  };
  // const getUserFriends = () => {
  //   fetchRequest(
  //     api + "api/friend/get-friends?user_id=" + props.userAuthenticated.userId,
  //     "get"
  //   ).then((response) => {
  //     if (response.data) {
  //       setFriends(response.data);
  //     }
  //   });
  // };

  useEffect(() => {
    if(props.edit){
      setEventDescription(props.eventDescription);
      setLocation(props.location);
      setEventName(props.eventName);
      setSelectedEndDate(props.selectedEndDate);
      setSelectedStartTime(props.selectedStartTime);
      setSelectedEndTime(props.selectedEndTime);
      setSelectedStartDate(props.selectedStartDate);
      setFileInput(props.image);
    }
    // getUserFriends();
  }, [props.edit]);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <form onSubmit={eventCreateSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              required={true}
              disablePast={true}
              style={{ marginRight: "80px", marginBottom: "40px" }}
              id="date-picker-dialog"
              label="From"
              format="MM/dd/yyyy"
              value={selectedStartDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardDatePicker
              margin="normal"
              required={true}
              style={{ marginRight: "80px", marginBottom: "40px" }}
              id="date-picker-dialog"
              label="To"
              format="MM/dd/yyyy"
              disablePast={true}
              value={selectedEndDate}
              minDate={selectedStartDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />

            <KeyboardTimePicker
              margin="normal"
              required={true}
              id="time-picker"
              style={{ marginRight: "80px", marginBottom: "40px" }}
              label="Start time"
              value={selectedStartTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />

            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              required={true}
              label="End time"
              style={{ marginRight: "80px", marginBottom: "40px" }}
              value={selectedEndTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
            <input
              accept="image/*"
              required
              onChange={handleFileChange}
              ref={fileInputs}
              className="d-none"
              id="icon-button-file"
              type="file"
            />
            <TextField
              id="outlined-textarea"
              label="Event Name"
              required={true}
              onChange={handleEventNameChange}
              value={eventName}
              style={{
                marginLeft: "10px",
              }}
              //   placeholder="Placeholder"

              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Location"
              required={true}
              onChange={handleLocationChange}
              value={location}
              style={{
                marginLeft: "98px",
              }}
              //   placeholder="Placeholder"

              variant="outlined"
            />

            <TextField
              id="outlined-multiline-static"
              label="Event Description"
              required={true}
              style={{ width: "78.5%", marginLeft: "10px", marginTop: "20px" }}
              multiline
              onChange={handleEventDescriptionChange}
              value={eventDescription}
              rows={4}
              variant="outlined"
            />

            {/* <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginLeft: "220px" }}
              startIcon={<AddCircleIcon />}
              onClick={handleOpenInviteFriendModal}
            >
              Invite Friends
            </Button> */}

            {!props.edit ? <Button
              variant="contained"
              type='submit'
              color="inherit"
              style={{ marginTop: "20px", marginLeft: "220px" }}
              startIcon={<AddCircleIcon />}
              
            >
              <b>Create</b>
            </Button> : <Button
              variant="contained"
              color="inherit"
              style={{ marginTop: "20px", marginLeft: "220px" }}
              startIcon={<AddCircleIcon />}
              onClick={eventEditSubmit}
            >
              <b>Edit Event</b>
            </Button>}

            {/* <InviteFriendsModal
              handleClose={handleCloseInviteFriendModal}
              open={openInviteFriendModal}
              friends={friends}
            /> */}

            {/* {fileInput && (
              <img
              width="200px"
              height="120px"
                style={{
                    flexShrink: 0,
                    borderRadius: 12,
                  marginLeft: "140px",
                  boxShadow: "0 2px 8px 0 #c1c9d7, 0 -2px 8px 0 #cce1e9",
                }}
                alt="event"
                src={fileInput}
              />
            )} */}
          </MuiPickersUtilsProvider></form>
        </div>{" "}
        <div className="col-4">
          {!fileInput ? (
            <label htmlFor="icon-button-file">
              <IconButton
                style={{ position: "relative", top: "180px", left: "80px" }}
                color="inherit"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraTwoToneIcon />{" "}
                {fileInput ? "Change Photo" : "Upload Photo"}
              </IconButton>
            </label>
          ) : (
            <label htmlFor="icon-button-file">
              <IconButton
                style={{ position: "relative", top: "20px", left: "80px" }}
                color="inherit"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCameraTwoToneIcon />{" "}
                {fileInput ? "Change Photo" : "Upload Photo"}
              </IconButton>
            </label>
          )}

          <EventCard
            eventDescription={eventDescription}
            eventName={eventName}
            selectedStartTime={selectedStartTime}
            selectedEndTime={selectedEndTime}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            location={location}
            image={fileInput}
            faces={props.content}
            
          />
        </div>
      </div>
    </div>
  );
}

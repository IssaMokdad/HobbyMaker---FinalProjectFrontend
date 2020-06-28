import React, { useState, useRef, useEffect } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { api } from "../Apis";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import swal from "sweetalert";
import moment from "moment";
import PublicIcon from "@material-ui/icons/Public";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import EventCard from "./EventCard";
import Button from "@material-ui/core/Button";
//using this component for creating and editing events
export default function CreateEvent(props) {

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  moment(new Date()).format("YYYY-MM-DD");
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const token = { Authorization: "Bearer " + localStorage.getItem("token") };
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [location, setLocation] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [privacy, setPrivacy] = useState("");

  const handleChangePrivacy = (event) => {
    setPrivacy(event.target.value);
  };

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
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticated.userId));
    formData.append("description", eventDescription);
    formData.append("name", eventName);
    formData.append("start_date", selectedStartDate);
    formData.append("end_date", selectedEndDate);
    formData.append("privacy", privacy);
    formData.append("start_time", moment(selectedStartTime).format("LT"));
    formData.append("end_time", moment(selectedEndTime).format("LT"));
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
          setPrivacy("");
        }
      });
  };

  const eventEditSubmit = () => {
    let formData = new FormData();
    formData.append("image", fileInputs.current.files[0]);
    formData.append("user_id", parseInt(props.userAuthenticatedId));
    formData.append("description", eventDescription);
    formData.append("event_id", props.eventId);
    formData.append("name", eventName);
    formData.append("start_date", selectedStartDate);
    formData.append("privacy", privacy);
    formData.append("end_date", selectedEndDate);
    formData.append("start_time", selectedStartTime);
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
          props.getUserEvents();
          swal({
            title: "Edited Successfully!",
            icon: "success",
          });
        }
      });
  };

  useEffect(() => {
    if (props.edit) {
      setEventDescription(props.eventDescription);
      setLocation(props.location);
      setEventName(props.eventName);
      setSelectedEndDate(props.selectedEndDate);
      setSelectedStartTime(props.selectedStartTime);
      setSelectedEndTime(props.selectedEndTime);
      setSelectedStartDate(props.selectedStartDate);
      setFileInput(props.image);
      setPrivacy(props.privacy);
    }
    // eslint-disable-next-line
  }, [props.edit]);

  return (
    <div className="container">
      <FormControl
        style={
          privacy
            ? {
                width: "120px",
                display: "inline",
                position: "absolute",
                zIndex: 1,
                left: "83%",
                top: "120px",
              }
            : {
                width: "120px",
                position: "absolute",
                zIndex: 1,
                left: "83%",
                top: "110px",
              }
        }
      >
        {!privacy ? (
          <InputLabel id="demo-controlled-open-select-label">
            Privacy
          </InputLabel>
        ) : (
          ""
        )}
        <Select
          labelId="demo-controlled-open-select-label"
          value={privacy}
          onChange={handleChangePrivacy}
          id="demo-mutiple-name"
        >
          <MenuItem value="public">
            <strong style={{ marginRight: "5px" }}>Public</strong>{" "}
            <PublicIcon />
          </MenuItem>
          <MenuItem value="onlyFriends">
            <strong style={{ marginRight: "5px" }}>Friends</strong>{" "}
            <PeopleAltIcon />
          </MenuItem>
        </Select>
      </FormControl>
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
                variant="outlined"
              />

              <TextField
                id="outlined-multiline-static"
                label="Event Description"
                required={true}
                style={{
                  width: "78.5%",
                  marginLeft: "10px",
                  marginTop: "20px",
                }}
                multiline
                onChange={handleEventDescriptionChange}
                value={eventDescription}
                rows={4}
                variant="outlined"
              />

              {!props.edit ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="inherit"
                  style={{ marginTop: "20px", marginLeft: "220px" }}
                  startIcon={<AddCircleIcon />}
                >
                  <b>Create</b>
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="inherit"
                  style={{ marginTop: "20px", marginLeft: "220px" }}
                  startIcon={<AddCircleIcon />}
                  onClick={eventEditSubmit}
                >
                  <b>Edit Event</b>
                </Button>
              )}
            </MuiPickersUtilsProvider>
          </form>
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
                style={{ position: "relative", top: "10px", left: "0px" }}
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
            selectedStartTime={
              !props.edit
                ? moment(selectedStartTime).format("LT")
                : selectedStartTime
            }
            selectedEndTime={
              !props.edit
                ? moment(selectedEndTime).format("LT")
                : selectedEndTime
            }
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            location={location}
            image={fileInput}
            privacy={privacy}
            faces={props.content}
          />
        </div>
      </div>
    </div>
  );
}

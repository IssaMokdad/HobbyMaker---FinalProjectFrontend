import React, { useEffect, Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "react-flags-select/css/react-flags-select.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { fetchRequest, api } from "./Apis";
import swal from "sweetalert";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditProfile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const passwordChangeSubmit = (event) => {
    if (password.length < 8) {
      setPasswordHelperText("Password must be 8 characters or more");
      setPasswordError(1);
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordHelperText("Passwords must match");
      setPasswordError(1);
      return;
    }
    let data = {
      user_id: props.userAuthenticatedId,
      password,
      password_confirmation: passwordConfirm,
    };
    fetchRequest(api + "api/user/password-change", "post", data).then(
      (response) => {
        if (response.message === "success") {
          setPassword("");
          setPasswordConfirm("");
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
        }
      }
    );
  };

  const scaryAnimals = [
    { label: "Writing", value: "Writing" },
    { label: "Baking", value: "Baking" },
    { label: "Refinishing furniture", value: "Refinishing furniture" },
    { label: "Flea Market Shopping", value: "Flea Market Shopping" },
    { label: "Catering", value: "Catering" },
    { label: "Making Music", value: "Making Music" },
    { label: "Football", value: "Football" },
    { label: "Basketball", value: "Basketball" },
    { label: "Bartending", value: "Bartending" },
    { label: "Chess", value: "Chess" },
    { label: "Waraa", value: "Waraa" },
    { label: "Cycling", value: "Cycling" },
  ];

  //   if (password.length < 8) {
  //     setPasswordHelperText("Password must be 8 characters or more");
  //     setPasswordError(1);
  //     setIsLoading("");
  //     return;
  //   }
  //   if (password !== passwordConfirm) {
  //     setPasswordHelperText("Passwords must match");
  //     setPasswordError(1);
  //     setIsLoading("");
  //     return;
  //   }

  useEffect(() => {
    setCountry(props.user.country);
    setRegion(props.user.city);
    setBirthday(props.user.birthday);
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    let hobbies = [];
    if (props.user.hobbies !== undefined) {
      hobbies = props.user.hobbies.map((hobby) => ({
        label: hobby.hobby,
        value: hobby.hobby,
      }));
    }
    setMultiValue(hobbies);
    // eslint-disable-next-line
  }, []);

  const [multiValue, setMultiValue] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handleMultiValueChange = (option) => {
    setMultiValue(option);
  };

  const handleChangePassword = (event) => {
    setPasswordError("");
    setPassword(event.target.value);
  };

  const handleCountryChange = (country) => {
    setCountry(country);
  };
  const handleChangeRegion = (region) => {
    setRegion(region);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleBirthdayChange = (date) => {
    setBirthday(moment(date).format("YYYY-MM-DD"));
  };

  // const handleHobbyChange = (event) => {
  //   setHobby([]);
  // };

  const handleChangePasswordConfirm = (event) =>
    setPasswordConfirm(event.target.value);

  const submitProfileInfoChange = () => {
    if(multiValue.length===0){
      swal('You forgot to enter your hobby')
      return
    }
    let data = {
      first_name: firstName,
      last_name: lastName,
      country,
      birthday,
      city: region,
      user_id: props.userAuthenticatedId,
      hobby: multiValue.map(hobby=>hobby.value),
    };
    fetchRequest(api + "api/user/info-change", "post", data).then(
      (response) => {
        if (response.message === "success") {
          props.getUserInfo();
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
        }
      }
    );
  };

  return (
    <Fragment>
      <Grid container item xs={12}>
        <Grid
          item
          container
          xs={4}
          style={{
            flexDirection: "column",
            marginLeft: "200px",
            display: "flex",
          }}
        >
          <Grid item>
            <TextField
              fullWidth
              onChange={handleFirstNameChange}
              value={firstName}
              style={{ margin: "20px" }}
              id="filled-basic"
              label="First Name"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              onChange={handleLastNameChange}
              value={lastName}
              style={{ margin: "20px" }}
              id="filled-basic"
              label="Last Name"
              variant="filled"
            />
          </Grid>
          <Grid item>
            <Grid style={{ marginLeft: "20px", marginTop: "10px" }} item>
              <label>Hobby</label>
              <Select
                isMulti
                onChange={handleMultiValueChange}
                value={multiValue}
                options={scaryAnimals}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={3}
          container
          style={{ flexDirection: "column", display: "flex" }}
        >
          <Grid
            style={{
              display: "flex",
              columnDirection: "row",
              marginLeft: "50px",
              marginTop: "40px",
            }}
            item
          >
            <label style={{ marginRight: "14px" }}>Country</label>
            <CountryDropdown
              style={{ width: "180px" }}
              value={country}
              onChange={handleCountryChange}
            />
          </Grid>
          <Grid style={{ marginLeft: "50px", marginTop: "50px" }} item>
            <label style={{ marginRight: "20px" }}>Region</label>
            <RegionDropdown
              country={country}
              value={region}
              blankOptionLabel="No country selected"
              defaultOptionLabel="Now select a region"
              onChange={handleChangeRegion}
            />
          </Grid>

          <Grid
            style={{ position: "relative", left: "50px", top: "20px" }}
            item
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Birthday"
                format="MM/dd/yyyy"
                required={true}
                value={birthday}
                onChange={handleBirthdayChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
        <Grid
          item
          style={{ display: "flex", flexDirection: "column" }}
          container
          xs={2}
        >
          <div style={{ marginLeft: "60px", marginTop: "120px" }}>
            <Button onClick={handleOpen} variant="contained" color="danger">
              Change Password
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div
                  style={{
                    display: "flex",
                    width: "600px",
                    height: "600px",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    columnGap: "40px",
                  }}
                  className={classes.paper}
                >
                  <h2 style={{ textAlign: "center" }}>
                    <strong>Change your password</strong>
                  </h2>
                  {passwordError !== "" ? (
                    <Fragment>
                      <TextField
                        error
                        helperText={passwordHelperText}
                        onChange={handleChangePassword}
                        value={password}
                        label="New Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />

                      <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth
                        value={passwordConfirm}
                        onChange={handleChangePasswordConfirm}
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        value={password}
                        onChange={handleChangePassword}
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />

                      <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        value={passwordConfirm}
                        onChange={handleChangePasswordConfirm}
                        name="password"
                        label="Confirm Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Fragment>
                  )}
                  <Button
                    onClick={passwordChangeSubmit}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "40px" }}
                  >
                    Change Password
                  </Button>
                </div>
              </Fade>
            </Modal>
          </div>
        </Grid>
      </Grid>

      {/* <ReactFlagsSelect value={country} onChange={handleCountryChange} searchable={true} /> */}

      <Grid
        container
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
        xs={12}
      >
        <Button
          onClick={submitProfileInfoChange}
          variant="contained"
          color="primary"
        >
          Submit Changes
        </Button>
      </Grid>
    </Fragment>
  );
}

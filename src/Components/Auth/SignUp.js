import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CarouselForm from "../CarouselForm";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import { fetchRequest, api } from "../Apis";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const registerAttempt = (event) => {
    event.preventDefault();
    setIsLoading(1);
    let date = moment(selectedDate).format("YYYY-MM-DD");
    console.log(date);
    let data = {
      email,
      password,
      gender,
      birthday: date,
      first_name: firstName,
      last_name: lastName,
    };

    fetchRequest(api + "api/auth/signup", "post", data).then((response) => {
      if (response.message === "Successfully created user!") {
        setPassword("");
        setGender("");
        setSelectedDate();
        setFirstName("");
        setLastName("");
        setRegisterSuccess(1);
        setIsLoading("");
      } else if (response["Validation errors"]["email"]) {
        setEmailError(response["Validation errors"]["email"]);
        setIsLoading("");
      }
    });
  };

  const [emailError, setEmailError] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);

  const [firstName, setFirstName] = useState("");

  const [isLoading, setIsLoading] = useState("");

  const [lastName, setLastName] = useState("");

  const [registerSuccess, setRegisterSuccess] = useState("");

  const [password, setPassword] = useState("");

  const [gender, setGender] = useState("");

  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmailError("");
    setEmail(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  if (registerSuccess) {
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Alert variant="filled" severity="success">
            A link has been sent to your email {email} to verify registration.
            You are one step behind to find your HOBBY partner!
          </Alert>
        </div>
      </Container>
    );
  }
  return (
    <Container
      style={{ backgroundColor: "white" }}
      component="main"
      maxWidth="lg"
    >
      <CssBaseline />
      <Grid container spacing={2} direction="row">
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
          item
          xs={7}
        >
          <h2 style={{ textAlign: "center", color: "blue", marginTop: "20px" }}>
            <strong>
              HobbyMaker's mission is clear, bring talented people around the
              world together!
            </strong>
          </h2>
          <CarouselForm />
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "55px",
            alignItems: "center",
          }}
          item
          xs={4}
        >
          <img
            alt="logo"
            width="238.5"
            height="200"
            src="/images/hobbymaker-logo.png"
          />

          <form onSubmit={registerAttempt} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required={true}
                  fullWidth
                  value={firstName}
                  onChange={handleChangeFirstName}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required={true}
                  value={lastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleChangeLastName}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                {emailError !== "" ? (
                  <TextField
                    error
                    helperText={emailError}
                    variant="outlined"
                    required={true}
                    fullWidth
                    value={email}
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChangeEmail}
                    autoComplete="email"
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    fullWidth
                    required={true}
                    value={email}
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChangeEmail}
                    autoComplete="email"
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  required={true}
                  name="password"
                  label="Password"
                  value={password}
                  type="password"
                  id="password"
                  onChange={handleChangePassword}
                  autoComplete="current-password"
                />
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container display="flex" justify="center">
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Birthday"
                    format="MM/dd/yyyy"
                    disableFuture={true}
                    required={true}
                    maxDate={new Date("2010-01-31")}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={gender}
                onChange={handleGenderChange}
              >
                <div
                  style={{ width: "100%" }}
                  className="container ml-4 mt-2 justify-content-center"
                >
                  <div className="row">
                    <div style={{ marginTop: 12 }} className=" col">
                      <FormLabel component="legend">Gender</FormLabel>
                    </div>
                    <div className="col">
                      <FormControlLabel
                        value="female"
                        control={<Radio required={true} />}
                        label="Female"
                      />
                    </div>

                    <div className="col">
                      <FormControlLabel
                        value="male"
                        control={<Radio required={true} />}
                        label="Male"
                      />
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>

            {isLoading === "" ? (
              <Button
                disabled={
                  email &&
                  password &&
                  selectedDate &&
                  gender &&
                  firstName &&
                  lastName
                    ? false
                    : true
                }
                type="submit"
                style={{ width: "100%" }}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            ) : (
              <div className={classes.root}>
                <LinearProgress variant="query" />
                <LinearProgress variant="query" color="secondary" />
              </div>
            )}

            <Grid container justify="center">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </form>
          <Box mt={1}>
            <Copyright />
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}

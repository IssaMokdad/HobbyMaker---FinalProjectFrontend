import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { fetchRequest,api } from "../Apis";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import { Alert } from "@material-ui/lab";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = React.useState("");
  const [emailMessageSuccess, setEmailMessageSuccess] = React.useState('')
  const handleChangeEmail = (event) => {
    if (emailError) {
      setEmailError("");
    }

    setEmail(event.target.value);
  };
  const passwordReset = (event) => {
    event.preventDefault();
    setIsLoading(1)
    let data = {
      email,
    };

    fetchRequest(api+"api/password/create", "post", data).then(
      (response) => {
        if(response.message==="We have e-mailed your password reset link!"){
          setEmailMessageSuccess(1)
        }
        else{
          setEmailError(1)
          setIsLoading('')
        }
        // if (response.message === "Authorized") {
        //   setLoginError("");
        //   setPassword("");
        //   props.handleChangeToken(response);
        // } else {
        //   setEmail("");
        //   setPassword("");
        //   setLoginError(1);
        // }
      }
    );
  };
  if (emailMessageSuccess) {
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Alert variant="filled" severity="success">
            A link has been sent to your email {email} to reset your password.
          </Alert>
        </div>
      </Container>
    );
  }
  return (
    <Container style={{ backgroundColor: "white" }} component="main" maxWidth="lg">
      <CssBaseline />
      <Grid container>
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
      <div className={classes.paper}>
      <img
          alt="logo"
          width="238.5"
          height="200"
          src="/images/hobbymaker-logo.png"
        />
        {/* <Typography component="h1" variant="h5">
          Sign in
        </Typography> */}
        <form onSubmit={passwordReset} className={classes.form}>
          {
            emailError===1 ? 
            <TextField
            error
            helperText="This email doesn't exist"
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChangeEmail}
              value={email}
              autoFocus
            />
            :
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleChangeEmail}
              value={email}
              autoFocus
            />
          }
            
           

           {isLoading==='' ? <Button
            type="submit"
            style={{width:'100%'}}
            variant="contained"
            disabled = {email ? false : true}
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button> : 
          <div style={{margin:'20px', width:'90%'}} className={classes.root}>
            <LinearProgress variant="query" />
            <LinearProgress variant="query" color="secondary" />
          </div>}
          <Grid container>
            <Grid item xs>
              <Link to='/' variant="body2">
                Login Again
              </Link>
            </Grid>
            <Grid item>
              <Link to="signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div><Box mt={8}>
        <Copyright />
      </Box></Grid>
      <Grid item xs={4}></Grid>
      </Grid>
    </Container>
  );
}

import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequest, api } from "./Apis";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
}));
export default function PasswordReset() {
  const classes = useStyles();
  //getting the token from the query string
  const { token } = useParams();
  const [isTokenRight, setIsTokenRight] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const handleChangePassword = (event) => {
    setPasswordError("");
    setPassword(event.target.value);
  };
  
  const passwordResetAttempt = (event) => {
    event.preventDefault();
    setIsLoading(1);

    if (password.length < 8) {
      setPasswordHelperText("Password must be 8 characters or more");
      setPasswordError(1);
      setIsLoading("");
      return;
    }
    if (password !== passwordConfirm) {
      setPasswordHelperText("Passwords must match");
      setPasswordError(1);
      setIsLoading("");
      return;
    }
    let data = {
      password,
      password_confirmation: passwordConfirm,
      token: token,
    };
    fetchRequest(api + "api/password/reset", "post", data).then((response) => {
      if (response.email) {
        setResetSuccess(1);
      }
    });
  };
  const handleChangePasswordConfirm = (event) =>
    setPasswordConfirm(event.target.value);

  useEffect(() => {
    fetchRequest(api + `api/password/find/${token}`, "get").then((response) => {
      if (response.email) {
        setIsTokenRight(1);
      }
    });
  }, []);

  if (resetSuccess) {
    return (
      <Container component="main" maxWidth="md">
        <div className={classes.paper}>
          <Alert variant="filled" severity="success">
            Your password has been reset successfully, now you can{" "}
            <Link style={{ color: "white" }} to="/">
              login again!
            </Link>
          </Alert>
        </div>
      </Container>
    );
  }
  if (isTokenRight) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>
          <form onSubmit={passwordResetAttempt} className={classes.form}>
            {passwordError !== "" ? (
              <Fragment>
                <TextField
                  error
                  helperText={passwordHelperText}
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth
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
                  fullWidth
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
            )}

            {isLoading === "" ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change Password
              </Button>
            ) : (
              <div className={classes.root}>
                <LinearProgress variant="query" />
                <LinearProgress variant="query" color="secondary" />
              </div>
            )}
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Login Again
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="lg">
        <div className={classes.paper}>
          <Alert variant="filled" severity="warning">
            You have used this email to reset your password before, go to{" "}
            <Link variant="body2" to="/passwordreset">
              password reset page
            </Link>{" "}
            and send another email again to reset your password
          </Alert>
        </div>
      </Container>
    );
  }
}

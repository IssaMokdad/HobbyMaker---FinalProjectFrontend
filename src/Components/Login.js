import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { fetchRequest } from "./Apis";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";

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

export default function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");

  const handleChangePassword = (event) => setPassword(event.target.value)

  const handleChangeEmail = (event) => {
    if (loginError) {
      setLoginError("");
    }

    setEmail(event.target.value);
  };
  const loginAttempt = (event) => {
    event.preventDefault();
    let data = {
      email,
      password,
    };
    
    fetchRequest("http://localhost:8000/api/auth/login", "post", data).then(
      (response) => {
        if (response.message === "Authorized") {
          setLoginError("");
          setPassword("");
          props.handleChangeToken(response);
        } else {
          setEmail("");
          setPassword("");
          setLoginError(1);
        }
      }
    );
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={loginAttempt} className={classes.form}>
          {loginError ? (
            <TextField
              error
              helperText="Wrong crendentials"
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
          ) : (
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
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            value={password}
            onChange={handleChangePassword}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/passwordreset' variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="signup" variant="body2">
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
}
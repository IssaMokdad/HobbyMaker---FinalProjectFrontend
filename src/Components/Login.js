import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ImageCard from "./PostCard";
import Carousel from "./CarouselForm";
import { fetchRequest } from "./Apis";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CarouselForm from './CarouselForm';
import { borderRadius } from '@material-ui/system';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageCard: {
    width: "100%",
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

  const handleChangePassword = (event) => setPassword(event.target.value);

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
    <Container
      style={{ backgroundColor: "#f2f2f2",  }}
      mt={1}
      component="main"
      maxWidth="lg"
    >
      <Grid
        container
        spacing={2}
        direction="row"
        maxWidth="lg"
      >
        <CssBaseline />
        {/* <Grid
          item
          container
          xs={4}
          direction="column"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid
            className={classes.imageCard}
            style={{ marginTop: "10px" }}
            item
          >
            <ImageCard image="/images/pexels-photo-274422.webp" />
            <Grid />
          </Grid>
          <Grid className={classes.imageCard} item>
            <ImageCard image="/images/hands-hand-book-reading.jpg" />
          </Grid>
          <Grid className={classes.imageCard} item>
            <ImageCard image="/images/pexels-photo-346726.jpeg" />
          </Grid>
        </Grid> */}
      
        {/* <Grid
          item
          xs={6}
          direction="column"
          justify="center"
          alignItems="center"
        > */}
          {/* <Typography component="h1" variant="h5">
            You're feeling alone?

            You can't find someone to share your hobby with?

            Well, that's why HobbyMaker exists!

            Sign up and find you're partner instantly!
            </Typography> */}
          {/* <CarouselForm /> */}
        {/* </Grid> */}
        <Grid
          item
          xs={4}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar> */}
            
              <img width='238.5' height='226.35' src='/images/twitter_login_sidebar_illustration.png' />
            
            <form onSubmit={loginAttempt} className={classes.form}>
              {loginError ? (
                <TextField
                  error
                  helperText="Wrong crendentials"
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth
                  // size='small'
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
                  style = {{borderRadius:'30px'}}
                  variant="outlined"
                  borderRadius={16}
                  // size='small'
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
                // size='small'
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
                size='small'
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/passwordreset" variant="body2">
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
        </Grid>
        {/* <Grid
          item
          container
          xs={4}
          direction="column"
          spacing={1}
          justify="center"
          alignItems="center"
        >
          <Grid
            className={classes.imageCard}
            style={{ marginTop: "10px" }}
            item
          >
            <ImageCard image="/images/pexels-photo-1047540.jpeg" />
            <Grid />
          </Grid>
          <Grid className={classes.imageCard} item>
            <ImageCard image="/images/pexels-photo-610294.jpeg" />
          </Grid>
          <Grid className={classes.imageCard} item>
            <ImageCard image="/images/pexels-photo-442576.jpeg" />
          </Grid>
        </Grid> */}
      </Grid>
    </Container>
  );
}

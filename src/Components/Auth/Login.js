import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { fetchRequest, api } from "../Apis";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "./Copyright";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SocialButton from "../FacebookLogin";
import GoogleLogin from "../GoogleLogin";
import CarouselForm from "../CarouselForm";
// quickstart-1590241264177
//faceboon appid: 253749016050969

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
    marginBottom: "20px",
    marginTop:'20px'
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

  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (user) => {
    setLoading(true);
    console.log(user);
    let data = {
      email: user.profile.email,
      first_name: user.profile.firstName,
      last_name: user.profile.lastName,
    };

    fetchRequest(api + "api/auth/social-login", "post", data).then(
      (response) => {
        if (response.message === "Authorized") {
          props.handleChangeToken(response);
        } else {
          alert("There is something wrong with social login!, retry");
        }
      }
    );
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = (event) => setPassword(event.target.value);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

    fetchRequest(api + "api/auth/login", "post", data).then((response) => {
      if (response.message === "Authorized") {
        setLoginError("");
        setPassword("");
        props.handleChangeToken(response);
      } else {
        setEmail("");
        setPassword("");
        setLoginError(1);
      }
    });
  };
  return (
    <Container
      style={{ backgroundColor: "white" }}
      mt={1}
      component="main"
      maxWidth="lg"
    >
      <Grid container spacing={2} direction="row">
        <CssBaseline />

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
        {/* <Grid item xs={4}> */}
        {/* <CarouselForm /> */}
        {/* </Grid> */}
        <Grid
          item
          xs={4}
          container
          direction="column"
          style={{ marginLeft: "55px" }}
        >
          <div className={classes.paper}>
            <img
              alt="logo"
              width="238.5"
              height="200"
              src="/images/hobbymaker-logo.png"
            />

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
                  style={{ borderRadius: "30px" }}
                  variant="outlined"
                  // size='small'
                  margin="normal"
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
                // margin="normal"
                fullWidth
                // size='small'
                value={password}
                onChange={handleChangePassword}
                name="password"
                label="Password"
                type={!showPassword ? "password" : "text"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {!loading ? (
                <Button
                  type="submit"
                  fullWidth
                  disabled={email && password ? false : true}
                  size="medium"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              ) : (
                <div className={classes.root}>
                  <LinearProgress variant="query" />
                  <LinearProgress variant="query" color="secondary" />
                </div>
              )}
              {/* <Grid
                container
                item
                style={{ justifyContent: "center", alignContent: "center" }}
              ><strong style={{fontSize:'20px', marginBottom:'10px'}}>or</strong></Grid> */}
              <Grid fullWidth container item>
                <Grid item xs={6}>
                  <SocialButton
                    provider="facebook"
                    appId="253749016050969"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                  ></SocialButton>
                </Grid>
                <Grid item xs={6}>
                  <GoogleLogin handleSocialLogin={handleSocialLogin} />
                </Grid>
              </Grid>
              <Grid style={{ marginTop: "10px" }} container>
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
      </Grid>
    </Container>
  );
}

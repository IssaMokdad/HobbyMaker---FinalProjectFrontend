import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";

// or
const useStyles = makeStyles({
  imageIcon: {
    height: "100%",
    objetFit: "contain",
  },
  iconRoot: {
    textAlign: "center",
  },
});

export default function GoogleLogin1(props) {
  const classes = useStyles();

  const responseGoogle = (response) => {
    let user = {
      profile: {
        lastName: response.Tt.tU,
        firstName: response.Tt.sW,
        email: response.Tt.Du,
      },
    };
    props.handleSocialLogin(user);
  };

  return (
    <GoogleLogin
      clientId="437968791270-7bkgabh4v8q4j395qg4806ag5n4kkgjl.apps.googleusercontent.com"
      // buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={(renderProps) => (
        <div style={{ position: "relative", left: "35px" }}>
          <Button
            // width='98%'
            //always true instead of disabled={renderProps.disabled}
            onClick={renderProps.onClick}
            disabled={false}
            variant="contained"
            color="default"
            endIcon={
              <img height="30" width="30" src="images/icons8-google.svg" />
            }
          >
            <span style={{ fontSize: "14px" }}>Sign in with </span>
          </Button>
        </div>
      )}
      cookiePolicy={"single_host_origin"}
    >
      {/* <Button
  variant="inherit"
  color="primary"
>
 <strong style={{fontSize:'14px',position:'relative',top:'6px', height:'34px'}}>Sign in with</strong>
</Button> */}
    </GoogleLogin>
  );
}

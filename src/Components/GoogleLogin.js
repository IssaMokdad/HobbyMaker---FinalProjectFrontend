import React from "react";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";




export default function GoogleLogin1(props) {
  

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
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      render={(renderProps) => (
        <div style={{ position: "relative", left: "35px" }}>
          <Button
            onClick={renderProps.onClick}
            disabled={false}
            variant="contained"
            color="default"
            endIcon={
              <img alt='google icon' height="30" width="30" src="images/icons8-google.svg" />
            }
          >
            <span style={{ fontSize: "14px" }}>Sign in with </span>
          </Button>
        </div>
      )}
      cookiePolicy={"single_host_origin"}
    >

    </GoogleLogin>
  );
}

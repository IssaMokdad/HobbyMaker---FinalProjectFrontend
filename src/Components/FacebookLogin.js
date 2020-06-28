import React from "react";
import SocialLogin from "react-social-login";
import FacebookIcon from "@material-ui/icons/Facebook";
import Button from "@material-ui/core/Button";
function FacebookLogin(props) {
  return (
    <Button
      onClick={props.triggerLogin}
      {...props}
      width="98%"
      variant="contained"
      color="default"
      endIcon={<FacebookIcon color="primary" style={{ fontSize: 30 }} />}
    >
      <span style={{ fontSize: "14px" }}>Sign in with</span>
    </Button>
  );
}

export default SocialLogin(FacebookLogin);

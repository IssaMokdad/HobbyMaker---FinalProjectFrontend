import React, { useState, useEffect } from "react";
import "date-fns";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { fetchRequest, api } from "../Apis";
import swal from "sweetalert";
import EditIcon from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

import Button from "@material-ui/core/Button";

let divCss = {
  borderStyle: "solid",
  width: "900px",
  borderRadius: "20px",
  padding: "10px",
  borderColor: "black",
  borderWidth: "3px",
};
export default function About(props) {
  const [bio, setBio] = useState(props.user.bio);
  // eslint-disable-next-line
  const [user, setUser] = useState(props.user);
  const [edit, setEdit] = useState("");

  const makeEditable = () => {
    setEdit(1);
  };
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const bioChangeSubmit = (event) => {
    let data = {
      user_id: props.userAuthenticatedId,
      bio,
    };
    fetchRequest(api + "api/user/save-bio", "post", data).then((response) => {
      if (response.message === "success") {
        setEdit("");
        swal({
          title: "Changed Successfully!",
          icon: "success",
        });
        props.getUserInfo();
      }
    });
  };

  useEffect(() => {}, [props.user]);

  return (
    <div
      className="container "
      style={{
        minHeight: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={divCss}>
        <h1 style={{ textAlign: "center" }}>
          <b>Hobbies</b>
        </h1>
        <Typography
          style={{ marginLeft: "18px" }}
          align="center"
          display="block"
          color="primary"
        >
          <h1 style={{ textAlign: "center", display: "inline" }}>
            {user.hobbies &&
              user.hobbies.map((hobby) => (
                <h3
                  style={{
                    marginRight: "20px",
                    textAlign: "center",
                    display: "inline",
                    fontSize: "34px",
                  }}
                >
                  <strong>{hobby.hobby}</strong>
                </h3>
              ))}
          </h1>
        </Typography>
      </div>

      <div style={{ marginTop: "20px", ...divCss }}>
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ textAlign: "center" }}>
            <b>
              From{" "}
              <LocationOnOutlinedIcon
                style={{ transform: "scale(2)" }}
                fontSize="large"
              />
            </b>
          </h1>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Typography display="block" color="primary">
            <h1
              style={{
                fontWeight: "bold",
                textAlign: "center",
                display: "block",
              }}
            >
              <b>{user.city + ", " + user.country}</b>
            </h1>
          </Typography>
        </div>
      </div>

      {!edit && (
        <div style={{ marginTop: "20px", ...divCss }}>
          <h1 style={{ textAlign: "center" }}>
            <b>Bio</b>
            {parseInt(user.id) === parseInt(props.userAuthenticatedId) && (
              <IconButton onClick={makeEditable} color="secondary">
                <EditIcon />
              </IconButton>
            )}
          </h1>
          <Typography color="primary" variant="body1" paragraph={true}>
            <strong>{bio}</strong>
          </Typography>
        </div>
      )}
      {edit && (
        <div style={{ width: "1110px", marginTop: "20px", ...divCss }}>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            fullWidth
            style={{ marginTop: "20px" }}
            multiline
            value={bio}
            onChange={handleBioChange}
            variant="outlined"
          />
          <Button
            onClick={bioChangeSubmit}
            style={{ marginLeft: "45%", marginTop: "20px" }}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}

import "date-fns";
import React, { useState, useRef, useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import IconButton from "@material-ui/core/IconButton";
import PhotoCameraTwoToneIcon from "@material-ui/icons/PhotoCameraTwoTone";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { fetchRequest, api, token } from "../Apis";
import swal from "sweetalert";

import moment from "moment";
import EditIcon from '@material-ui/icons/Edit';
import { Typography } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import VideoCall from '../Messenger/VideoCall/VideoCall';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

let divCss={borderStyle:'solid', borderRadius:'20px', padding:'10px', borderColor:'black', borderWidth:'3px'}
export default function About(props) {
  // The first commit of Material-UI

  const [bio, setBio] = useState(props.user.bio);
  const [user, setUser] = useState(props.user)
  const [edit, setEdit] = useState('')
  const constraints = {video:true}
  const localVideoRef = useRef()
  const remoteVideoRef = useRef()
  const success = (stream)=>{
    localVideoRef.current.srcObject = stream
  }

  const failure = (e)=>{
    console.log('getUserMediaError', e)
  }
  const makeEditable = ()=>{
    setEdit(1)
  }
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const bioChangeSubmit = (event) => {


    let data = {
      user_id: props.userAuthenticatedId,
      bio
    }
    fetchRequest(api + "api/user/save-bio", "post", data).then(
      (response) => {
        if (response.message === "success") {
          setEdit("");
          swal({
            title: "Changed Successfully!",
            icon: "success",
          });
          props.getUserInfo()
        }
      }
    );
  };
  //using this component for creating and editing

  // const getUserFriends = () => {
  //   fetchRequest(
  //     api + "api/friend/get-friends?user_id=" + props.userAuthenticated.userId,
  //     "get"
  //   ).then((response) => {
  //     if (response.data) {
  //       setFriends(response.data);
  //     }
  //   });
  // };



  useEffect(() => {
    // getUserFriends();
    // navigator.mediaDevices.getUserMedia(constraints).then(success).catch(failure)
  }, [props.user]);

  return (
    
      <div className='container ' style={{ minHeight:'600px', display:'flex', flexDirection:'column',  alignItems:'center'}} >
          
  <div style={divCss} ><h1 style={{textAlign:'center', }}><b>Hobbies</b></h1><Typography style={{marginLeft:'18px'}} align='center' display='block' color='primary'><h1 style={{fontWeight:'bold', textAlign:'center', display:'inline'}}>{user.hobbies && user.hobbies.map(hobby=>  <h3 style={{marginRight:'20px',textAlign:'center', display:'inline'}}><strong>{hobby.hobby}</strong></h3>)}</h1></Typography></div>
    {/* <Button>Hobbies</Button> */}
    <div style={{marginTop:'20px',...divCss}}><div style={{marginTop:'20px',}} ><h1 style={{textAlign:'center' }}><b >From <LocationOnOutlinedIcon style={{transform:'scale(2)'}} fontSize='large' /></b></h1></div>
  <div style={{marginTop:'20px'}}><Typography display='block' color='primary'><h1 style={{fontWeight:'bold', textAlign:'center', display:'inline'}}>{user.city + ", " + user.country}</h1></Typography></div></div>
  
  {!edit && <div style={{marginTop:'20px',...divCss}}><h1 style={{textAlign:'center' }}><b>Bio</b>{parseInt(user.id)===parseInt(props.userAuthenticatedId) && <IconButton onClick={makeEditable} color='secondary'><EditIcon /></IconButton>}</h1><Typography color='primary' variant='body1' paragraph={true} ><strong>{bio}</strong></Typography></div>}
   {edit && <div style={{width:'1110px',marginTop:'20px',...divCss}} ><TextField
      id="outlined-multiline-static"
      label="Bio"
      fullWidth
      style={{marginTop:'20px'}}
      multiline
      value={bio}
      onChange={handleBioChange}
      variant="outlined"
    /><Button onClick={bioChangeSubmit} style={{marginLeft:'45%', marginTop:'20px'}} variant='contained' color='primary'>Save</Button></div> }
    {/* <div><video ref={localVideoRef} autoPlay></video></div>
    <div><video ref={remoteVideoRef} autoPlay></video></div> */}
    {/* <VideoCall user={user} userId='38' /> */}
    {/* <Test user={user} /> */}
</div>
  );
}

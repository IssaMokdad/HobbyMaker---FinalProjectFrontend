import React, { Fragment, useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import AppNavBar from "../AppNavBar";
import PostCard from "../Posts/PostCard";
import PostForm from "../Posts/PostForm";
import { fetchRequest, api , token } from "../Apis";
import Grid from "@material-ui/core/Grid";
import FriendSuggestionCard from "../Friends/FriendSuggestionCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import YoutubeVideos from './YoutubeVideos';
import ReactPlayer from 'react-player';

export default function SavedVideos(props) {
    const [videoIds, setVideoIds] = useState('')
    const [userAuthenticated, setUserAuthenticated] = useState('')
    const getUserInfo = () => {
        fetchRequest(api + "api/user/get-info/?user_id=" + props.userAuthenticated.userId, "get").then(
          (response) => {
            if (response.data) {
              setUserAuthenticated(response.data);
              let videoIDs=response.data.videos.map(video=>{
                return video.video_id
              })
              setVideoIds(videoIDs)
            } else {
              swal("Something went wrong!");
            }
          }
        );
      };
    useEffect(()=>{
        getUserInfo()
    }, [])
    return (
        
      <div className='container'>
          <h1 style={{textAlign:'center'}}><strong>Videos you have saved</strong></h1>
      <div className='row'>  
      
      <div className='col-12 d-flex justify-content-center flex-wrap '>
      
          {Array.from(videoIds).map(id=>
          
        //   <div className='mr-auto'><ReactPlayer width='500px' controls={true} url={'https://www.youtube.com/watch?v=' + id}  /></div>
            // {/* // <ReactPlayer controls={true} url={'https://www.youtube.com/watch?v=' + id}  />)} */}
            <div style={{marginRight:'20px'}}><YoutubeVideos fromSavedVideosComponent={true} getUserInfo={getUserInfo} key={id} buttonText='Unsave' userAuthenticatedId={props.userAuthenticated.userId} videoId={id} /></div>)}
                
      </div>
      </div> 
      </div> 
    );
  }
  
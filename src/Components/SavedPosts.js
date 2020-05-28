import React, { Fragment, useState, useEffect } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import AppNavBar from "./AppNavBar";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { fetchRequest, api, token } from "./Apis";
import Grid from "@material-ui/core/Grid";
import FriendSuggestionCard from "./FriendSuggestionCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import YoutubeVideos from "./YoutubeVideos";
import ReactPlayer from "react-player";

export default function SavedPosts(props) {
  const [savedPosts, setSavedPosts] = useState("");

  const getSavedPosts = () => {
    fetchRequest(
      api + "api/get-saved-posts/?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setSavedPosts(response.data);
      } else {
        swal("Something went wrong!");
      }
    });
  };
  useEffect(() => {
    getSavedPosts();
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom:'30px' }}>
        <strong>Posts you have saved</strong>
      </h1>
      <div className="row">
        <div className="col-12 d-flex justify-content-center flex-wrap ">
          {Array.from(savedPosts).map((post) => (
            //   <div className='mr-auto'><ReactPlayer width='500px' controls={true} url={'https://www.youtube.com/watch?v=' + id}  /></div>
            // {/* // <ReactPlayer controls={true} url={'https://www.youtube.com/watch?v=' + id}  />)} */}
            <div style={{marginRight:'20px'}}>
              <PostCard
                key={post.id}
                post={post}
                fromSavedPostsComponent='1'
                buttonSaveText={"Unsave Post"}
                getPosts={getSavedPosts}
                userAuthenticatedId={props.userAuthenticated.userId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

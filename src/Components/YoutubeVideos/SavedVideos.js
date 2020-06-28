import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { fetchRequest, api } from "../Apis";
import YoutubeVideos from "./YoutubeVideos";

export default function SavedVideos(props) {
  const [videoIds, setVideoIds] = useState("");
  // eslint-disable-next-line
  const [userAuthenticated, setUserAuthenticated] = useState("");
  const getUserInfo = () => {
    fetchRequest(
      api + "api/user/get-info/?user_id=" + props.userAuthenticated.userId,
      "get"
    ).then((response) => {
      if (response.data) {
        setUserAuthenticated(response.data);
        let videoIDs = response.data.videos.map((video) => {
          return video.video_id;
        });
        setVideoIds(videoIDs);
      } else {
        swal("Something went wrong!");
      }
    });
  };
  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>
        <strong>Videos you have saved</strong>
      </h1>
      <div className="row">
        <div className="col-12 d-flex justify-content-center flex-wrap ">
          {Array.from(videoIds).map((id) => (
            <div style={{ marginRight: "20px" }}>
              <YoutubeVideos
                fromSavedVideosComponent={true}
                getUserInfo={getUserInfo}
                key={id}
                buttonText="Unsave"
                userAuthenticatedId={props.userAuthenticated.userId}
                videoId={id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

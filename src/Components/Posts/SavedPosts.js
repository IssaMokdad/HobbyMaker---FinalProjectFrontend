import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import PostCard from "./PostCard";
import { fetchRequest, api } from "../Apis";

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
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        <strong>Posts you have saved</strong>
      </h1>
      <div className="row">
        <div className="col-12 d-flex justify-content-center flex-wrap ">
          {Array.from(savedPosts).map((post) => (
            <div
              style={{
                marginRight: "20px",
                marginBottom: "20px",
                width: "490px",
              }}
            >
              <PostCard
                key={post.id}
                post={post}
                fromSavedPostsComponent="1"
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

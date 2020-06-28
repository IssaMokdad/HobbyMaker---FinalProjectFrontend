import React, { useEffect, useRef } from "react";
import Peer from "simple-peer";
import { api } from "../../Apis";
import Pusher from "pusher-js";
import "./video.css";
var channel;

export default function VideoCall(props) {
  const mediaStreamConstraints = {
    video: true,
    audio: false,
  };

  let localVideo = useRef();
  let userVideo = useRef();

  var initiates;
  var pusher;
  var localStream;

  const initiate = () => {
    initiates = 1;
    const p = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });

    p.on("error", (err) => console.log("error", err));

    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));

      channel.trigger("client-someeventname" + props.userId, { data: data });
    });
    p.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    channel.bind("client-someeventname" + props.user.id, (e) => {
      console.log(e);

      p.signal(e.data);
    });

    p.on("connect", () => {
      console.log("CONNECT");
      p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log("data: " + data);
    });
  };

  const createConnection = (datas) => {
    const p = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });

    p.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));
      channel.trigger("client-someeventname" + props.userId, { data: data });
    });

    channel.bind("client-someeventname" + props.user.id, (e) => {
      console.log(e);

      p.signal(e.data);
    });

    p.on("connect", () => {
      console.log("CONNECT");
      p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log("data: " + data);
    });
  };

  function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;

    localVideo.current.srcObject = mediaStream;
  }

  function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error: ", error);
  }
  useEffect(() => {
    // eslint-disable-next-line
    pusher = new Pusher("bb8b5c6a21ad2865dda7", {
      authEndpoint: api + "api/broadcasting/auth",
      cluster: "ap2",
      auth: {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    });

    channel = pusher.subscribe("private-my-channel1");

    if (props.initiate === true) {
      setTimeout(initiate, 1000);
    } else if (props.initiate === false) {
      channel.bind("client-someeventname" + props.user.id, (e) => {
        if (initiates === undefined) {
          // eslint-disable-next-line
          initiates = 1;
          createConnection(e);
        }
      });
    }

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);

    return () => {
      pusher.unsubscribe("private-my-channel1");

      const tracks = localStream.getTracks();

      tracks.forEach(function(track) {
        track.stop();
      });
    };
  }, [props.initiate]);

  return (
    <div className="video-container">
      <video
        playsInline={true}
        autoPlay={true}
        width={300}
        className="my-video"
        height={300}
        ref={localVideo}
      />
      <video
        playsInline={true}
        autoPlay={true}
        width={300}
        className="user-video"
        height={300}
        ref={userVideo}
      />
    </div>
  );
}

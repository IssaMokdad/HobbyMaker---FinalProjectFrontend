import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import { api, token } from "./Apis";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import swal from "sweetalert";
var channel;
var p;
export default function VideoCall(props) {
  const mediaStreamConstraints = {
    video: true,
    audio: true,
  };

  // Video element where stream will be placed.
  // const localVideo = document.querySelector('video');
  // let localStream = useRef() // Local stream that will be reproduced on the video
  const localVideo = useRef();
  const userVideo = useRef();
  let remoteStream = useRef();
  const [offer, setOffer] = useState();
  const [answer, setAnswer] = useState();
  const [answer1, setAnswer1] = useState();
  const [peer, setPeer] = useState("");
  var initiates;

  var localStream;
  const handleAnswer1Change = (event) => setAnswer1(event.target.value);

  const initiate = () => {
    initiates = 1;
    p = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });

    p.on("error", (err) => console.log("error", err));

    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));

      channel.whisper("someeventname" + props.userId, { data: data });

      // document.querySelector('#outgoing').textContent = JSON.stringify(data)
    });
    p.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      userVideo.current.srcObject = stream;
    });

    // document.querySelector('form').addEventListener('submit', ev => {
    //   ev.preventDefault()
    channel.listenForWhisper("someeventname" + props.user.id, (e) => {
      console.log(e);

      p.signal(e.data);
    });

    // })

    p.on("connect", () => {
      console.log("CONNECT");
      p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log("data: " + data);
    });

    // p.on('close', function () {  
    //   p.removeAllListeners();
    // p.destroy()
    // p=undefined;}
    // )
  };

  const createConnection = (datas) => {
    p = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });
    // p.on('error', err => console.log('error', err))
    p.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      userVideo.current.srcObject = stream;
    });
    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));
      channel.whisper("someeventname" + props.userId, { data: data });
    });
    // document.querySelector('#outgoing').textContent = JSON.stringify(data)

    // document.querySelector('form').addEventListener('submit', ev => {
    //   ev.preventDefault()
    channel.listenForWhisper("someeventname" + props.user.id, (e) => {
      console.log(e);

      p.signal(e.data);
    });

    // })

    p.on("connect", () => {
      console.log("CONNECT");
      p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log("data: " + data);
    });

    // p.on('close', function () {  
    //     p.removeAllListeners();
    //   p.destroy()
    //   p=undefined;}
    //   )
  };
  const handleAnswerChange = (event) => setAnswer(event.target.value);
  //   let localStream;
  // Handles success by adding the MediaStream to the video element.
  function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    // localVideo.srcObject = mediaStream;
    localVideo.current.srcObject = mediaStream;
    // localVideo.play()
  }

  // Handles error by logging a message to the console with the error message.
  function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error: ", error);
  }
  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "bb8b5c6a21ad2865dda7",
      cluster: "ap2",
      authEndpoint: api + "api/broadcasting/auth",
      auth: {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      forceTLS: true,
    });
    channel = window.Echo.private("my-channel1");

    //         channel.listen('pusher:subscription_succeeded', function() {
    // channel.whisper('someeventname', { your: 'yyy' });
    // });

    // channel.listen('pusher:subscription_succeeded', function() {
    // channel.whisper('someeventname', { your: 'yyy' });
    // });
    channel.listenForWhisper("someeventname" + props.user.id, (e) => {
      console.log(e);
      if (initiates !== 1) {
        initiates = 1;
        createConnection(e);
      }
    });

    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);

    return () => {
    // localStream.stop();
    // initiates=0
    // p.removeAllListeners();
    // p.destroy();
    // p=undefined
    // localStream=undefined
    };
  }, []);
  // Initializes media stream.

  return (
    <div>
      <video
        playsInline={true}
        autoPlay={true}
        width={300}
        height={300}
        ref={localVideo}
      />
      <video
        playsInline={true}
        autoPlay={true}
        width={300}
        height={300}
        ref={userVideo}
      />
      {/* <input type='text' value={offer}/> */}
      {/* <form onSubmit={createConnection}><input onChange={handleAnswerChange} type='text' value={answer} />
            <button type='submit' >submit </button></form> */}
      <button onClick={initiate}>initiate</button>

      {/* <button id="callButton">Call</button>
  <button id="hangupButton">Hang Up</button> */}
    </div>
  );
}

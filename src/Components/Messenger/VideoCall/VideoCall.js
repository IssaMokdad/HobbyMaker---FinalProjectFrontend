import React, { useEffect, useState, useRef } from "react";
import Peer from "simple-peer";
import { api, token } from "../../Apis";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import swal from "sweetalert";
import './video.css'
var channel;
// var p;
export default function VideoCall(props) {
  const mediaStreamConstraints = {
    video: true,
    audio: false,
  };

  // Video element where stream will be placed.
  // const localVideo = document.querySelector('video');
  // let localStream = useRef() // Local stream that will be reproduced on the video
  let localVideo = useRef();
  let userVideo = useRef();
  let remoteStream = useRef();
  const [offer, setOffer] = useState();
  const [answer, setAnswer] = useState();
  const [answer1, setAnswer1] = useState();
  const [peer, setPeer] = useState("");
  var initiates;
  var pusher;
  var localStream;
  const handleAnswer1Change = (event) => setAnswer1(event.target.value);

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

      channel.trigger("client-someeventname"+props.userId, { data: data });

      // document.querySelector('#outgoing').textContent = JSON.stringify(data)
    });
    p.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      userVideo.current.srcObject = stream;
    });

    // document.querySelector('form').addEventListener('submit', ev => {
    //   ev.preventDefault()
    channel.bind("client-someeventname" + props.user.id, (e) => {
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

  //   p.on('close', () => {
      
  //     if(peer !== undefined) {
  //         peer.destroy();
  //     }

  //     // p = undefined;
  // });

    // p.on('close', function () {  
    //   p.removeAllListeners();
    // p.destroy()
    // p=undefined;}
    // )
  };

  const createConnection = (datas) => {
    const p = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });
    // p.on('error', err => console.log('error', err))

    // p.signal(JSON.stringify(datas.data));
    p.on("stream", (stream) => {
      // got remote video stream, now let's show it in a video tag
      userVideo.current.srcObject = stream;
    });
    p.on("signal", (data) => {
      console.log("SIGNAL", JSON.stringify(data));
      channel.trigger("client-someeventname"+props.userId, { data: data });
    });
    // document.querySelector('#outgoing').textContent = JSON.stringify(data)

    // document.querySelector('form').addEventListener('submit', ev => {
    //   ev.preventDefault()
    // channel.trigger(`client-signal-${userId}
    channel.bind("client-someeventname"+props.user.id , (e) => {
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

  //   p.on('close', () => {
      
  //     if(peer !== undefined) {
  //         peer.destroy();
  //     }

  //     // p = undefined;
  // });

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
    // window.Echo = new Echo({
    //   broadcaster: "pusher",
    //   key: "bb8b5c6a21ad2865dda7",
    //   cluster: "ap2",
    //   authEndpoint: api + "api/broadcasting/auth",
    //   auth: {
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    //   },
    //   forceTLS: true,
    // });
    // channel = window.Echo.private("my-channel1");

    pusher = new Pusher('bb8b5c6a21ad2865dda7', {
      authEndpoint: api + "api/broadcasting/auth",
      cluster: 'ap2',
      auth: {
         
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
  });

  channel = pusher.subscribe('private-my-channel1');


    //         channel.listen('pusher:subscription_succeeded', function() {
    // channel.whisper('someeventname', { your: 'yyy' });
    // });

    // channel.listen('pusher:subscription_succeeded', function() {
    // channel.whisper('someeventname', { your: 'yyy' });
    // });
    if(props.initiate===true){
      setTimeout(initiate, 1000)
    }
    else if(props.initiate===false){
      // channel.bind(`client-signal-${this.user.id}`, (signal)
      channel.bind("client-someeventname"+props.user.id, (e) => {
        console.log(e);
        if (initiates === undefined) {
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
     pusher.unsubscribe('private-my-channel1')
      // const stream = localVideo.current.srcObject;
      const tracks = localStream.getTracks();
    
      tracks.forEach(function(track) {
        track.stop();
      });
    // localStream=undefined
    // localVideo.current=null
    // userVideo.current=null
      // localVideo.current.srcObject = null;
      
    };
  }, [props.initiate]);
  // Initializes media stream.
console.log(initiates)
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
      /></div>

    
  );
}

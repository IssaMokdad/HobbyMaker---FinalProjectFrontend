import React, {useEffect, useState, useRef, Fragment} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import {fetchRequest, api} from '../../Apis';
import './MessageList.css';

export default function MessageList(props) {
  
  const [friend, setFriend] = useState('')
  const MY_USER_ID = props.userAuthenticatedId;
  const [messages, setMessages] = useState([])
  const [friendId, setFriendId]=useState(props.friendId)
  // const scrollToBottom = ()=> {
  //   animateScroll.scrollToBottom({
  //     containerId: "containerElement"


  useEffect(() => {
    if(props.realTimeMessage){
      addMessage(props.realTimeMessage)
      props.setRTMEmpty()
    }

      if(props.friendId!==friendId){
        
        getMessages();
      }
       

      
      
  },[props.friendId, props.realTimeMessage])

  const addMessage = (message)=>{
    let tempMessages = 
    [{
      id: message.id,
      author: message.from,
      message: message.message,
      timestamp: new Date(message.created_at).getTime()
    }]
    setMessages([...messages, ...tempMessages])
  }
  const getMessages = () => {
    
    fetchRequest(api + "api/get-messages?user_id="+props.userAuthenticatedId+'&friend_id='+props.friendId, 'get')
     .then(response=> {
        if(response.data){

        
        let tempMessages = response.data.map(message=>
        ({
          id: message.id,
          author: message.from,
          message: message.message,
          timestamp:  new Date(message.created_at).getTime()
        }))
        
      
      setMessages([...tempMessages])
      // if(response.data.length===0){
      //   setMessages('')
      // }
    }
  if(response.friend){
    setFriend(response.friend)
  }})}

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = parseInt(current.author) === parseInt(MY_USER_ID);
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    if(friend===''){
      return (<h1> Select a friend to start chat!</h1>)
    }

    return(
      // <Element name="container" className="element" id="containerElement">
      <Fragment>
      <div style={{width:'72%', backgroundColor: "#F0F0F0",position:'fixed', left:'350px'}}><img className="conversation-photo" src={api + 'images/'+ friend.image} alt="conversation" />
      <span>{friend.first_name + ' ' + friend.last_name}</span></div>

        
        <div className="message-list">


<div >{renderMessages() } </div>
        
        <Compose addMessage={addMessage} friendId={props.friendId} userAuthenticatedId={props.userAuthenticatedId} rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
        
      </div></Fragment>

    );
}
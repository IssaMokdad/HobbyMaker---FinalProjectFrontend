import React, {useState, useEffect, useRef} from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import ScrollToBottom, {useScrollToBottom} from 'react-scroll-to-bottom';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
export default function Messenger(props) {

  const [friendId, setFriendId] = useState('')
  const scrollToBottom = useScrollToBottom();
  const handleContactChange = (friendId)=>{

    setFriendId(friendId)
    
  }
  {/* here realTimeMessageSentFromMe is only to change the last message of the left sidebar when it is sent by me
  and it is coming from compose component which is inside messagelist */}
  const [realTimeMessageSentFromMe, setRealTimeMessageSentFromMe] = useState('')

  const handleRealTimeMessageSentFromMe = (message)=>{
    setRealTimeMessageSentFromMe(message)
  }
  useEffect(()=>{
    scrollToBottom()
  }, [])


    return (
      <div className="messenger">
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />

        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        <div className="scrollable sidebar">
          {/* here realTimeMessageSentFromMe is only to change the last message of the left sidebar when it is sent by me
          and it is coming from compose component which is inside messagelist */}
          <ConversationList realTimeMessageSentFromMe={realTimeMessageSentFromMe} setRTMEmpty={props.setRTMEmpty} realTimeMessage={props.realTimeMessage}  handleContactChange={handleContactChange} userAuthenticatedId={props.userAuthenticatedId} />
        </div>
        <ScrollToBottom className="scrollable content">
        <div>
          <MessageList handleRealTimeMessageSentFromMe={handleRealTimeMessageSentFromMe} setRTMEmpty={props.setRTMEmpty} realTimeMessage={props.realTimeMessage} friendId={friendId} userAuthenticatedId={props.userAuthenticatedId}/>
        </div></ScrollToBottom>
      </div>
  );
}
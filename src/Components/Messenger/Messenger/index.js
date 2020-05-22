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
          <ConversationList setRTMEmpty={props.setRTMEmpty} realTimeMessage={props.realTimeMessage} handleContactChange={handleContactChange} userAuthenticatedId={props.userAuthenticatedId} />
        </div>
        <ScrollToBottom className="scrollable content">
        <div>
          <MessageList setRTMEmpty={props.setRTMEmpty} realTimeMessage={props.realTimeMessage} friendId={friendId} userAuthenticatedId={props.userAuthenticatedId}/>
        </div></ScrollToBottom>
      </div>
  );
}
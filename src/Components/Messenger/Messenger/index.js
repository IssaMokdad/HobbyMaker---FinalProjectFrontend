import React, { useState, useEffect} from "react";
import ConversationList from "../ConversationList";
import MessageList from "../MessageList";
import "./Messenger.css";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

export default function Messenger(props) {
  const [friendId, setFriendId] = useState("");
  const scrollToBottom = useScrollToBottom();
  const handleContactChange = (friendId) => {
    setFriendId(friendId);
  };
  
    /* here realTimeMessageSentFromMe is only to change the last message of the left sidebar when it is sent by me
  and it is coming from compose component which is inside messagelist */
  
  const [realTimeMessageSentFromMe, setRealTimeMessageSentFromMe] = useState(
    ""
  );

  const handleRealTimeMessageSentFromMe = (message) => {
    setRealTimeMessageSentFromMe(message);
  };
  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        {/* here realTimeMessageSentFromMe is only to change the last message of the left sidebar when it is sent by me
          and it is coming from compose component which is inside messagelist */}
        <ConversationList
          realTimeMessageSentFromMe={realTimeMessageSentFromMe}
          setRTMEmpty={props.setRTMEmpty}
          realTimeMessage={props.realTimeMessage}
          handleContactChange={handleContactChange}
          userAuthenticatedId={props.userAuthenticatedId}
        />
      </div>
      <ScrollToBottom className="scrollable content">
        <div>
          <MessageList
            handleRealTimeMessageSentFromMe={handleRealTimeMessageSentFromMe}
            setRTMEmpty={props.setRTMEmpty}
            realTimeMessage={props.realTimeMessage}
            friendId={friendId}
            userAuthenticatedId={props.userAuthenticatedId}
          />
        </div>
      </ScrollToBottom>
    </div>
  );
}

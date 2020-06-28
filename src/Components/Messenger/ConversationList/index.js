import React, { useState, useEffect } from "react";
import ConversationListItem from "../ConversationListItem";

import { fetchRequest, api } from "../../Apis";
import "./ConversationList.css";

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [friendId, setFriendId] = useState("");
  const handleLastMessageChange = (message, fromOrToFriendId) => {
    let newLastMessages = conversations.map((conversation) => {
      if (conversation.friendId === fromOrToFriendId) {
        conversation.text = message;
      }
      return conversation;
    });
    setConversations(newLastMessages);
  };
  const handleContactChange = (event) => {
    event.preventDefault();
    setFriendId(event.currentTarget.dataset.id);
    props.handleContactChange(event.currentTarget.dataset.id);
  };

  useEffect(() => {
    if (props.realTimeMessage) {
      handleLastMessageChange(
        props.realTimeMessage.message,
        props.realTimeMessage.from
      );
      props.setRTMEmpty();
    } else {
      getConversations();
    }

    if (props.realTimeMessageSentFromMe) {
      handleLastMessageChange(
        props.realTimeMessageSentFromMe.message,
        props.realTimeMessageSentFromMe.to
      );
    }
    // eslint-disable-next-line
  }, [props.realTimeMessage, props.realTimeMessageSentFromMe]);

  const getConversations = () => {
    fetchRequest(
      api + "api/get-unread-messages?user_id=" + props.userAuthenticatedId,
      "get"
    ).then((response) => {
      let unread_messages_count = response.unread_messages_count.map(
        (result) => {
          return result;
        }
      );

      let lastMessages = response.last_messages.map((result) => {
        if (result) {
          return result.message;
        } else {
          return "";
        }
      });

      let newConversations = response.data.map((result, i) => {
        return {
          friendId: result.friend_id,
          photo: api + "images/" + result.image,
          name: `${result.first_name} ${result.last_name}`,
          unread: unread_messages_count[i],
          text: lastMessages[i],
          key: i,
        };
      });
      setConversations([...newConversations]);
    });
  };
  console.log(conversations);
  return (
    <div className="conversation-list">
      {conversations.map((conversation) => (
        <div data-id={conversation.friendId} onClick={handleContactChange}>
          <ConversationListItem
            key={conversation.friendId}
            friendIdSelected={friendId}
            data={conversation}
            userAuthenticatedId={props.userAuthenticatedId}
          />
        </div>
      ))}
    </div>
  );
}

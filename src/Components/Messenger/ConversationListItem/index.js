import React, { useEffect, useState } from "react";
import Badge from "../../Badge";
import { fetchRequest, api } from "../../Apis";
import "./ConversationListItem.css";

export default function ConversationListItem(props) {
  // eslint-disable-next-line
  const [friendId, setFriendId] = useState(props.data.friendId);

  const [unread, setUnread] = useState(props.data.unread);

  const markUnreadMessagesAsRead = () => {
    let data = {
      friend_id: friendId,
      user_id: props.userAuthenticatedId,
    };
    fetchRequest(api + "api/mark-messages-as-read-per-user", "post", data).then(
      (response) => {
        if (response.message === "success") {
          setUnread(0);
        }
      }
    );
  };
  useEffect(() => {
    if (parseInt(props.friendIdSelected) === parseInt(friendId)) {
    } else {
      setUnread(props.data.unread);
    }
    // eslint-disable-next-line
  }, [props.data, props.friendIdSelected]);

  const { photo, name, text } = props.data;
  if (unread) {
    return (
      <div
        onClick={markUnreadMessagesAsRead}
        className="unread-messages conversation-list-item"
      >
        <Badge count={unread} />
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{name}</h1>
          <p className="conversation-snippet">
            {text.substring(0, 20) + "..."}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="conversation-list-item">
      <Badge count={props.unread} />
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">
          {text !== undefined && text.length > 20
            ? text.substring(0, 20) + "..."
            : text}
        </p>
      </div>
    </div>
  );
}

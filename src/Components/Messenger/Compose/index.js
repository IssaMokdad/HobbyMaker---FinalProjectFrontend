import React, { useState, useEffect } from "react";
import "./Compose.css";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import { fetchRequest, api } from "../../Apis";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InsertEmoticonTwoToneIcon from "@material-ui/icons/InsertEmoticonTwoTone";
import swal from "sweetalert";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
});

export default function Compose(props) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState("");
  const handleMessageInput = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    } else {
      setMessage(event.target.value);
    }
  };

  const sendMessage = (event) => {
    setShowEmojis();
    event.preventDefault();

    let data = {
      user_id: props.userAuthenticatedId,
      friend_id: props.friendId,
      message: message,
    };

    fetchRequest(api + "api/send-message", "post", data).then((response) => {
      if (response.data) {
        setMessage("");
        props.handleRealTimeMessageSentFromMe(response.data);
        props.addMessage(response.data);
      } else {
        swal("Something went wrong, check your connection");
      }
    });
  };

  const showEmojisBlock = () => {
    if (!showEmojis) {
      setShowEmojis(1);
    } else {
      setShowEmojis();
    }
  };
  const addEmoji = (event) => {
    setMessage(message + event.native);
  };

  useEffect(() => {}, []);
  return (
    <form onSubmit={sendMessage}>
      <div className="compose">
        <TextField
          variant="filled"
          style={{ width: "74%" }}
          required={true}
          disableUnderline={true}
          multiline
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage(event);
            }
          }}
          value={message}
          onChange={handleMessageInput}
          placeholder="Send a message"
          color="secondary"
          InputProps={{
            classes,
            style: {
              borderRadius: "25px",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  style={{
                    marginBottom: "15px",
                    // marginRight: "230px",
                    transform: "scale(1.5)",
                  }}
                  onClick={showEmojisBlock}
                >
                  <InsertEmoticonTwoToneIcon />
                </IconButton>
                <IconButton
                  type="submit"
                  onChange={handleMessageInput}
                  variant="filled"
                  color="primary"
                  style={{
                    marginBottom: "15px",
                    marginRight: "0px",
                    transform: "scale(1.5)",
                  }}
                  aria-label="add to favorites"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      {showEmojis && (
        <span style={{ position: "relative", left: "570px", top: "128px" }}>
          <Picker onSelect={addEmoji} />
        </span>
      )}
      <span style={{ marginLeft: "800px" }}></span>
    </form>
  );
}

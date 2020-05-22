import React, {useState, useEffect} from 'react';
import './Compose.css';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import {fetchRequest, api} from '../../Apis';

export default function Compose(props) {

  const [message, setMessage] = useState('')

  const handleMessageInput = (event)=>{
    setMessage(event.target.value)
  }

  const sendMessage = (event)=>{
    event.preventDefault()

    let data={
      'user_id':props.userAuthenticatedId,
      'friend_id':props.friendId,
      'message':message
    }

    fetchRequest(api + "api/send-message", 'post', data).then(response=>{
      setMessage('')
      props.addMessage(response.data)
    })

    
  }

  useEffect(()=>{

  }, [])
    return (
      <form onSubmit={sendMessage}>
      <div className="compose">
    
      <TextField
        variant="filled"
        fullWidth
        required={true}
        multiline
        value={message}
        onChange={handleMessageInput}
        placeholder="Send a message"
        color="secondary"
        InputProps={{
            style: {
                borderRadius: '25px'
              },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                onChange={handleMessageInput}
                variant="filled"
                color="primary"
                style={{
                  marginBottom: "15px",
                  marginRight: "230px",
                  transform: "scale(2)",
                }}
                aria-label="add to favorites"
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    
  );
        {/* <input
          type="text"
          className="compose-input border-color-primary"
          placeholder="Type a message, @name"
        /> */}

        {
          props.rightItems
        }
      </div></form>
    );
}
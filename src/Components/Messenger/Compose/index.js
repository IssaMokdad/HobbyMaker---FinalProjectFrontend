import React, {useState, useEffect} from 'react';
import './Compose.css';
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import InputAdornment from "@material-ui/core/InputAdornment";
import {fetchRequest, api} from '../../Apis';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import InsertEmoticonTwoToneIcon from '@material-ui/icons/InsertEmoticonTwoTone';
import swal from 'sweetalert';

export default function Compose(props) {

  const [message, setMessage] = useState('')
  const [showEmojis, setShowEmojis] = useState('')
  const handleMessageInput = (event)=>{
    
    if (event.key==='Enter'){
      event.preventDefault();
    }
    else{
      setMessage(event.target.value)
    }
    
  }

  const sendMessage = (event)=>{

    setShowEmojis()
    event.preventDefault()

    let data={
      'user_id':props.userAuthenticatedId,
      'friend_id':props.friendId,
      'message':message
    }

    fetchRequest(api + "api/send-message", 'post', data).then(response=>{
      if(response.data){
        setMessage('')
        props.handleRealTimeMessageSentFromMe(response.data)
        props.addMessage(response.data)
      }
      else{
        swal('Something went wrong, check your connection')
      }

    })

    
  }

  const showEmojisBlock = ()=>{
    if(!showEmojis){
      setShowEmojis(1)
    }else{
      setShowEmojis()
    }
    
  }
  const addEmoji = (event)=>{
    setMessage(message + event.native)
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
        onKeyPress={(event) => {
          if (event.key== 'Enter'){
              sendMessage(event)}

      }}
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
              <IconButton style={{
                  marginBottom: "15px",
                  // marginRight: "230px",
                  transform: "scale(2)",
                }} onClick={showEmojisBlock}><InsertEmoticonTwoToneIcon/></IconButton>
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
      </div>
      {showEmojis && <span style={{marginLeft:'600px'}}>
   <Picker onSelect={addEmoji} /></span>}
   <span style={{marginLeft:'800px'}}></span>
</form>
    );
}
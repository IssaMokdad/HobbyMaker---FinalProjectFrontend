import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import {fetchRequest, api} from '../../Apis';
import './ConversationList.css';
import Button from '@material-ui/core/Button';

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [friendId, setFriendId] = useState('')
  // const [lastMessages, setLastMessages] = useState('')
  const handleLastMessageChange = (message, fromOrToFriendId)=>{
    let newLastMessages=conversations.map((conversation)=>{
      if(conversation.friendId===fromOrToFriendId){
        conversation.text=message
      }
      return conversation
    })
    setConversations(newLastMessages)
  }
  const handleContactChange = (event)=>{
    event.preventDefault()
    setFriendId(event.currentTarget.dataset.id)
    props.handleContactChange( event.currentTarget.dataset.id)
  }


  useEffect(() => {
    if(props.realTimeMessage){
      handleLastMessageChange(props.realTimeMessage.message, props.realTimeMessage.from)
      props.setRTMEmpty()
    }
    else{
      getConversations()
    }

    if(props.realTimeMessageSentFromMe){
      handleLastMessageChange(props.realTimeMessageSentFromMe.message, props.realTimeMessageSentFromMe.to)
    }
    // getConversations()
  },[props.realTimeMessage, props.realTimeMessageSentFromMe])

 const getConversations = () => {
    fetchRequest(api + "api/get-unread-messages?user_id=" + props.userAuthenticatedId, 'get')
    .then(response=> {

      let unread_messages_count = response.unread_messages_count.map(result=>{

          return result
        

      })
      
       let lastMessages = response.last_messages.map(result=>
          {
            if(result){
              return result.message
            }
            else{
              return ''
            }
           
          })

        let newConversations = response.data.map((result,i) => {
          
          return {
            friendId:result.friend_id,
            photo: api + 'images/'+ result.image,
            name: `${result.first_name} ${result.last_name}`,
            unread: unread_messages_count[i],
            text:lastMessages[i],
            key:i
            // text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        setConversations([...newConversations])
    });
  }
  console.log(conversations)
    return (
      <div className="conversation-list">
        <Toolbar
          title="Contact List"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        {/* <ConversationSearch /> */}
        {
          
          conversations.map(conversation =>
            <div data-id={conversation.friendId} onClick={handleContactChange}>
              {/* <Button fullwidth type='submit' variant="outlined"> */}
            <ConversationListItem
              key={conversation.friendId}
              friendIdSelected={friendId}
              data={conversation}
              userAuthenticatedId={props.userAuthenticatedId}
            />
            {/* </Button> */}
            </div>
          )
        }
      </div>
    );
}
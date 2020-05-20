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

  const handleContactChange = (event)=>{
    event.preventDefault()
    props.handleContactChange( event.currentTarget.dataset.id)
  }

  useEffect(() => {
    getConversations()
  },[])

 const getConversations = () => {
    fetchRequest(api + "api/friend/get-friends?user_id=" + props.userAuthenticatedId, 'get')
    .then(response=> {

        let newConversations = response.data.map(result => {
          
          return {
            id:result.friend_id,
            photo: api + 'images/'+ result.image,
            name: `${result.first_name} ${result.last_name}`,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });
        setConversations([...conversations, ...newConversations])
    });
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
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
            <div data-id={conversation.id} onClick={handleContactChange}>
              {/* <Button fullwidth type='submit' variant="outlined"> */}
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
            {/* </Button> */}
            </div>
          )
        }
      </div>
    );
}
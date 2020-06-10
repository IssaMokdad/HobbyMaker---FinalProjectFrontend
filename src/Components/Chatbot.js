import React, {useState, useEffect, useRef} from 'react';
import ChatBot from 'react-simple-chatbot';
import NearbyEvents from './Events/NearbyEvents'

export default function CustomChatBot(props){

    const [userAuthenticated, setUserAuthenticated] = useState(props.userAuthenticated)
    const steps = [

      {
         id: "Help",
         message:"Hello, How can we help you, " + userAuthenticated.first_name + "?",
         trigger: "Displaying options to help"
        },
     
      {
         id: "Displaying options to help",
         options: [
                    {
                      value: "nearbyevents",
                      label: "Nearby Public Events",
                      trigger: "Asking For Events"
                    },
                    { 
                      value: "news",
                      label: "Latest News about your hobbies",
                      trigger: "Latest News"
                    } 
                  ]
      },
      {
         id: "Latest News",
         end:true,
         message: "Sorry, We don't have news available at the moment.",
      },
      {
         id: "Asking For Events",
         end:true,
         component:(<NearbyEvents userAuthenticated={{userId:userAuthenticated.id}} />),
      },
      
];
    useEffect(()=>{
      setUserAuthenticated(props.userAuthenticated)
    }, [])

    console.log(userAuthenticated)
    return <ChatBot floating={true} steps={steps} />;
  
}
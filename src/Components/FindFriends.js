import React from "react";
import "react-flags-select/css/react-flags-select.css";
import Map from './Map';



export default function FindFriends(props){
    
    return(<Map userAuthenticatedId={props.userAuthenticatedId} />)
}




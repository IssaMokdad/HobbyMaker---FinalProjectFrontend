import React, {useEffect} from "react";
import Map from './Map';



export default function FindFriends(props){
    useEffect(()=>{

    }, [props.city])
    
    return<Map city={props.city} userAuthenticatedId={props.userAuthenticatedId} />
}




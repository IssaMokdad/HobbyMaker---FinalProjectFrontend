import React from 'react';
import Messenger from '../Messenger';

export default function App(props) {
    return (
      <div className="App">
        <Messenger setRTMEmpty={props.setRTMEmpty} realTimeMessage={props.realTimeMessage} userAuthenticatedId={props.userAuthenticatedId} />
      </div>
    );
}
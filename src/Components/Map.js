import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
// import mapStyles from "./mapStyles";

function Map() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPerson(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 33.893791, lng: 35.501778 }}
    //   defaultOptions={{ styles: mapStyles }}
    >
      {/* {parkData.features.map(park => ( */}
        <Marker
          key={1}
          position={{
            lat: 33.8932791,
            lng: 35.5012778
          }}
          onClick={() => {
            setSelectedPerson(true);
          }}
          icon={{
            url: `data:image/jpeg;base64,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`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
                {/* <Marker
          key={2}
          position={{
            lat: 33.8922791,
            lng: 35.5022778
          }}
        //   onClick={() => {
        //     setSelectedPark(park);
        //   }}
          icon={{
            // url: `/skateboarding.svg`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        /> */}
      {/* ) */}
      {/* )} */}

      {selectedPerson && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPerson(null);
          }}
          position={{
            lat: 33.8932791,
            lng: 35.5012778
          }}
        >
          <div>
          <h2><Link exact to={"/profile/3" }>Issa Mokdad</Link></h2>
            {/* <p>Mokdad</p> */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  const [display, setDisplay] = useState(true)

  useEffect(()=>{
    return () => {
      setDisplay(false)
    }
  })
  return (
     display && <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M'
          
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
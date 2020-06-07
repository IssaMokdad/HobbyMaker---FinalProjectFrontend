import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import {fetchRequest, api} from '../Apis';
import swal from "sweetalert";
import CircularProgress from "@material-ui/core/CircularProgress";
import RegionSelect from "react-region-flag-select";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import * as parkData from "./data/skateboard-parks.json";
// import mapStyles from "./mapStyles";

function Map(props) {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [people, setPeople] = useState(null)
  const [latt, setLat] = useState()
  const [lngg, setLng] = useState()
  const [loading, setLoading] = useState()

  const getPeopleWithSameHobbyAnywhere = () => {
    fetchRequest(
      api +
        "api/users/get-recommendations-anywhere?user_id=" +
        props.userAuthenticatedId + "&country=" + props.country + "&city=" + props.city,
      "get"
    ).then((response) => {
      if (response.data !== undefined) {
        setPeople(response.data);
      }
    });
  };

  const getAddressCoordinates = ()=>{
    
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?address='+ props.country +','+ props.city +'&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M',
    ).then(response=>response.json()).then(response => {
      setLat(parseFloat(response.results[0].geometry.location.lat))
      setLng(parseFloat(response.results[0].geometry.location.lng))

    });
  }
  useEffect(() => {
    if(props.city!==undefined){
      getAddressCoordinates()
    }
    
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPerson(null);
      }
    };
    window.addEventListener("keydown", listener);

    getPeopleWithSameHobbyAnywhere()
    setLoading(1)
    return () => {
      window.removeEventListener("keydown", listener);
    };
    
  }, [props.city]);
  
  if(!loading){
    return(<CircularProgress />)
    
  }
  return(
    <GoogleMap
    defaultZoom={10}
    defaultCenter={{lat:1, lng:1}}
    center={loading!=='a' && { lat: latt, lng: lngg }} 
    // defaultOptions={{ styles: mapStyles }}
  > 
    {people && Array.from(people).map(person => (
      <Marker
        key={person.id}
        position={{
          lat: parseFloat(person.latitude),
          lng: parseFloat(person.longitude)
        }}
        onClick={() => {
          setLoading('a')
          setSelectedPerson(person);

        }}
        icon={{
          url: api + "images/" + person.image,
          scaledSize: new window.google.maps.Size(25, 25)
        }}
      />))}

    {selectedPerson && (
      <InfoWindow
        onCloseClick={() => {
          setLoading('a')
          setSelectedPerson(null);

        }}
        position={{
          lat: parseFloat(selectedPerson.latitude),
          lng: parseFloat(selectedPerson.longitude)
        }}
      >
        <div>
        <h2><Link exact to={"/profile/"+selectedPerson.id }>{selectedPerson.first_name + " " + selectedPerson.last_name}</Link></h2>
          {/* <p>Mokdad</p> */}
        </div>
      </InfoWindow>
    )}
  </GoogleMap>);

}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App(props) {
  const [display, setDisplay] = useState(true)

  useEffect(()=>{
    return () => {
      setDisplay(false)
    }
  })
  //Geolocation api by lang and alt
  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M
  return (
     display && <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped country={props.country} city={props.city} userAuthenticatedId={props.userAuthenticatedId}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCVuknDu1ZA5Ipp2jnA0cBf5FWL594QI-M'
          
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
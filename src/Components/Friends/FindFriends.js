import React, {useEffect, useState, Fragment} from "react";
import Map from '../Map/Map';
import RegionSelect from "react-region-flag-select";
import zIndex from "@material-ui/core/styles/zIndex";
import Button from "@material-ui/core/Button";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
export default function FindFriends(props){
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const handleChangeAddress = (data) => {
        setCountry(data.countryData.data.name);
        if (data.stateData.hasOwnProperty("data")) {
          setCity(data.stateData.data.name);
        }
      };

      const setCountryCityEmpty = ()=>{
        setCountry('')
        setCity('')
      }
    useEffect(()=>{

    }, [props.city])
    
    return(
       <Fragment>{(city && country) ? <Button
        variant="contained"
        color="inherit"
        style={{ marginBottom:'20px',marginTop: "20px", marginLeft: "300px" }}
        startIcon={<LocationOnOutlinedIcon />}
        onClick={setCountryCityEmpty}
      >
        <b>See people having the same hobby in any place in the world</b>
      </Button> :  <div style={{marginLeft:'400px'}}><RegionSelect handleChange={handleChangeAddress} isCity={false} /></div>}
    {(country && city) && <Map country={country || props.country} city={city || props.city} userAuthenticatedId={props.userAuthenticatedId} />}</Fragment>)
}




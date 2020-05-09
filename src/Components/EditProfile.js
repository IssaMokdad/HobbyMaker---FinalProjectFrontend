import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "react-flags-select/css/react-flags-select.css";
import ReactFlagsSelect from "react-flags-select";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EditProfile(props) {



  const scaryAnimals = [
    { label: "Writing", value: "Writing" },
    { label: "Baking", value: "Baking" },
    { label: "Refinishing furniture", value: "Refinishing furniture" },
    { label: "Flea Market Shopping", value: "Flea Market Shopping" },
    { label: "Catering", value: "Catering" },
    { label: "Making Music", value: "Making Music" },
    { label: "Football", value: "Football" },
    { label: "Basketball", value: "Basketball" },
    { label: "Bartending", value: "Bartending" },
    { label: "Chess", value: "Chess" },
    { label: "Waraa", value: "Waraa" },
  ];

  useEffect(() => {}, []);

  const [country, setCountry] = useState("");
  const handleCountryChange = (country) => {
    setCountry(country);
  };
  const [region, setRegion] = useState("");

  const handleChangeRegion = (region) => {
    setRegion(region);
  };

  return (
    <Grid container item xs={9}>
      <Grid
        item
        container
        xs={4}
        style={{ flexDirection: "column", display: "flex" }}
      >
        <Grid item>
          <TextField
            fullWidth
            style={{ margin: "20px" }}
            id="filled-basic"
            label="First Name"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            style={{ margin: "20px" }}
            id="filled-basic"
            label="Last Name"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Grid style={{ marginLeft: "20px", marginTop: "10px" }} item>
            <Select options={scaryAnimals} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={5}
        container
        style={{ flexDirection: "column", display: "flex" }}
      >
        <Grid style={{ marginLeft: "50px", marginTop: "40px" }} item>
          <CountryDropdown value={country} onChange={handleCountryChange} />
        </Grid>
        <Grid style={{ marginLeft: "50px", marginTop: "50px" }} item>
          <RegionDropdown
            country={country}
            value={region}
            blankOptionLabel="No country selected"
            defaultOptionLabel="Now select a region"
            onChange={handleChangeRegion}
          />
        </Grid>
        
        <Grid style={{position:'relative', left:'50px', top:'20px'}} item>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
              
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Birthday"
                  format="MM/dd/yyyy"
                  required={true}
                //   value={selectedDate}
                //   onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              
            </MuiPickersUtilsProvider>
        </Grid>
      </Grid>

      {/* <ReactFlagsSelect value={country} onChange={handleCountryChange} searchable={true} /> */}
    </Grid>
  );
}

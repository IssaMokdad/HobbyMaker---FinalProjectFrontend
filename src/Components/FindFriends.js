import React, { useEffect, Fragment, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import "react-flags-select/css/react-flags-select.css";
import ReactFlagsSelect from "react-flags-select";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { fetchRequest, api } from "./Apis";
import swal from "sweetalert";
import Map from './Map';



export default function FindFriends(props){
    
    return(<Map  />)
}




import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import RegionSelect from "react-region-flag-select";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Select from "react-select";
import {hobbies as Hobbies} from './Hobbies';
import Map from './Map';
import {fetchRequest, api} from './Apis';
import swal from "sweetalert";
import SportsHandballIcon from '@material-ui/icons/SportsHandball';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <LocationOnIcon />,
    2: <SportsHandballIcon />,
    3: <SportsKabaddiIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Where do you live?", "Choose your hobbies", "Find a partner"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Enter your country and city";
    case 1:
      return "Enter your hobbies";
    case 2:
      return "These people are searching for partners too, pick up one!";
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [hobbies, setHobbies] = useState("");
  const steps = getSteps();
  const [user, setUser] = useState('')

  const handleHobbiesInput = (option) => {
    setHobbies(option);
  };

  const getUserInfo = () => {
    fetchRequest(api + "api/user/get-info/?user-id=" + props.userAuthenticated.userId, "get").then(
      (response) => {
        if (response.data) {
            setUser(response.data)
        } else {
          swal("Something went wrong!");
        }
      }
    );
  };

  const submitUserInfoInput = () => {
    if(activeStep===1 && hobbies){

    
    let data = {
      first_name: user.first_name,
      last_name: user.last_name,
      country,
      birthday:user.birthday,
      city,
      user_id: props.userAuthenticated.userId,
      hobby: hobbies.map(hobby=>hobby.value),
    };
    fetchRequest(api + "api/user/info-change", "post", data).then(
      (response) => {
        if (response.message === "success") {

        }else{
            swal('Something went wrong, check your connection!')
        }
      }
    );
  }};


  const handleChangeAddress = (data) => {
    setCountry(data.countryData.data.name);
    if (data.stateData.hasOwnProperty("data")) {
      setCity(data.stateData.data.name);
    }
  };

  const setFirstTimeLoginToFalse = ()=>{
      let data = {
        user_id:props.userAuthenticated.userId
      }
      fetchRequest(api + "api/user/first-time-login" , "post", data).then(
        response => {
          //this method only to change the first time login field to false
        }
      );
  
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    submitUserInfoInput()
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  console.log(country);
  console.log(city);

  useEffect(()=>{
      getUserInfo()
      setFirstTimeLoginToFalse()
  }, [])
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: "40px", marginLeft: "42%" }}>
            {" "}
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={(activeStep===0 && (!country || !city))}
                  disabled={(activeStep===1 && (!hobbies))}
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {activeStep === 0 && (
        <div style={{ marginTop: "40px", marginLeft: "37%" }}>
          <RegionSelect handleChange={handleChangeAddress} isCity={false} />
        </div>
      )}
      {activeStep === 1 && (
        <div style={{ width:'300px', marginTop: "40px", marginLeft: "37%" }}>
          {" "}
          <Select
            isMulti
            onChange={handleHobbiesInput}
            value={hobbies}
            options={Hobbies}
          />{" "}
        </div>
        
      )}
      {activeStep === 2 &&
      <div style={{  marginTop: "40px", }}>
          <Map city={city} userAuthenticatedId={props.userAuthenticated.userId} />
        </div>
      }
    </div>
  );
}

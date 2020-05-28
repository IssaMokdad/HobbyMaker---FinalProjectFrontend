import React, { useState } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PeopleCardFooter from "@mui-treasury/components/cardFooter/people";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useWideCardMediaStyles } from "@mui-treasury/styles/cardMedia/wide";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import { fetchRequest, api, token } from "./Apis";
import swal from "sweetalert";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import CreateEvent from './CreateEvent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditEventModal from './EditEventModal';
import GoingModal from './GoingModal';

// moment().format('LL')

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: "auto",
  },
  content: {
    padding: 24,
  },
}));

const EventCard = (props) => {
  const cardStyles = useStyles();
  const wideCardMediaStyles = useWideCardMediaStyles();
  const fadeShadowStyles = useFadedShadowStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  
  const [openEventModal, setOpenEventModal] = useState(false);
  const [display, setDisplay] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openGoingModal, setOpenGoingModal] = useState(false)
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseEventModal = () => {
    setOpenEventModal(false);
  };
  const handleOpenEventModal = () => {
    setAnchorEl(null);
    setOpenEventModal(true);
  };

  const handleCloseGoingModal = () => {
    setOpenGoingModal(false);
  };
  const handleOpenGoingModal = ()=>{
    setOpenGoingModal(true);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEventDelete = (event) => {
    setAnchorEl(null);
    let id = event.target.id;

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this event!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let data = {
          event_id: id,
          user_id: props.userAuthenticatedId,
        };
        fetchRequest(api + "api/event-delete", "POST", data).then((data) => {
          if (data.message === "success") {
            swal({
              title: "Deleted Successfully!",
              icon: "success",
            });

            props.getUserEvents()
          } else {
            swal({
              title: "Something went wrong, try again!",
            });
          }
        });
      } else {
        swal("Your event is safe!");
      }
    });
  };

  if (display) {
    return "";
  }

  return (
    <div>{props.fromCreatedEventsComponent ? <IconButton
    color="primary"
    style={{
    position:'relative',
    left:'700px',
    top:'40px',
    transform: "scale(1)",
    }}
    onClick={handleClick}
    aria-label="add to favorites"
  >
    <MoreVertIcon />
  </IconButton> : ''}
  {/* using create event component again for editing event */}
  <EditEventModal
          handleClose={handleCloseEventModal}
          open={openEventModal}
          content={<CreateEvent
            selectedEndDate={props.selectedEndDate}
            selectedStartTime={props.selectedStartTime}
            selectedEndTime={props.selectedEndTime}
            location={props.location}
            getUserEvents={props.getUserEvents}
            userAuthenticatedId={props.userAuthenticatedId}
            eventId={props.id}
            eventDescription={props.eventDescription}
            eventName={props.eventName}
            image={props.image}
            content={props.faces}
            selectedStartDate={props.selectedStartDate}
            edit='1' />}
        />
    <Card className={cx(cardStyles.root, fadeShadowStyles.root)}>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem id={props.id} onClick={handleEventDelete}>
          Delete
        </MenuItem>

        <MenuItem onClick={handleOpenEventModal}>Edit</MenuItem>
      </Menu>

      <p style={{ color: "red", marginLeft: "14px" }}>
        <strong style={{ fontSize: "14px", alignText: "center" }}>
          {moment(props.selectedStartDate).format("LL") +
            ", " +
            moment(props.selectedStartTime).format("LT") +
            " "}
        </strong>
        -{" "}
        <strong style={{ fontSize: "14px" }}>
          {moment(props.selectedEndDate).format("LL") +
            ", " +
            moment(props.selectedEndTime).format("LT")}
        </strong>
      </p>
      <CardMedia
        // component={'img'} // add this line to use <img />
        classes={wideCardMediaStyles}
        image={props.image}
      />
      <CardContent className={cardStyles.content}>
        <TextInfoContent
          classes={textCardContentStyles}
          heading={props.eventName + " - " + props.location}
          body={props.eventDescription}
        />
      </CardContent>
      <Box px={3} pb={3}>
        {props.faces && <IconButton onClick={handleOpenGoingModal}><PeopleCardFooter
          faces={props.faces.slice(0,4).map(user=>{
            return [api + "images/" + user.image]
          })}
          //   faces={[
          //     'https://i.pravatar.cc/300?img=1',
          //     'https://i.pravatar.cc/300?img=2',
          //     'https://i.pravatar.cc/300?img=3',
          //     'https://i.pravatar.cc/300?img=4',

          //   ]}
        /></IconButton>}
      </Box>
      <GoingModal
          handleClose={handleCloseGoingModal}
          open={openGoingModal}
          content={props.faces}
        />
    </Card>

    </div>
  );
};

export default EventCard;

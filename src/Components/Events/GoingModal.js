import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import GoingCard from "./GoingCard";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "400px",
    height: "80%",
    overflow: "scroll",
  },
}));

export default function GoingModal(props) {
  const classes = useStyles();

  useEffect(() => {}, [props.content]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 style={{ textAlign: "center" }} id="transition-modal-title">
              People Going
            </h2>
            {props.content &&
              props.content.map((friend) => (
                <GoingCard key={friend.id} content={friend} />
              ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

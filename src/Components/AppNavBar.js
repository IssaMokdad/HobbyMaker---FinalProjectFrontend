import React, { useState, useEffect, Fragment } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { fetchRequest, api, token } from "./Apis";
import FriendsList from "./Friends/FriendsList";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import FriendRequests from "./Friends/FriendRequests";
import HomeIcon from "@material-ui/icons/Home";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function AppNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchValue, setSearchValue] = useState(null)
  const [searchResults, setSearchResults] = useState(null)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElPopoverMessage, setAnchorElPopoverMessage] = React.useState(
    null
  );

  const [notifications, setNotifications] = useState([]);
  const [notificationsLength, setNotificationsLength] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesLength, setMessagesLength] = useState(null);
  const handleClosePopoverMessage = () => {
    setAnchorElPopoverMessage(null);
  };
  const open2 = Boolean(anchorElPopoverMessage);
  const id2 = open2 ? "simple-popover" : undefined;
  const [doneLoading, setDoneLoading] = useState("");
  const handleClickPopoverMessage = (event) => {
    setAnchorElPopoverMessage(event.currentTarget);
  };
  const handleSearchValue = (event) => {
    setSearchValue(event.target.value)
    fetchRequest(
      api + "api/search?search_value=" + event.target.value,
      "get"
    ).then((response) => {
      if (response.data) {
        setSearchResults(response.data);
      }
    });
  };
  const [
    anchorElPopoverNotification,
    setAnchorElPopoverNotification,
  ] = React.useState(null);

  const handleClosePopoverNotification = () => {
    setAnchorElPopoverNotification(null);
  };
  const open = Boolean(anchorElPopoverNotification);
  const id = open ? "simple-popover" : undefined;
  const handleClickPopoverNotification = (event) => {
    setAnchorElPopoverNotification(event.currentTarget);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={props.logout}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/profile/" + props.userAuthenticatedId}>My account</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          // onClick={markNotificationsAsRead}
          aria-describedby={id2}
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={0} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        {/* <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClickPopoverNotification}
            > */}
        <IconButton
          // onClick={markNotificationsAsRead}
          aria-describedby={id}
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notificationsLength} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* </Button> */}
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const realTimeNotifications = () => {
    getNotifications();
    // setNotifications([...notifications, props.rTNotification]);
    // setNotificationsLength(parseInt(notificationsLength + 1));
  };

  const realTimeMessages = () => {
    getUnreadMessages();
    // let index;
    // messages.map((message, i)=>{
    //   if(parseInt(props.realTimeMessage.from)===parseInt(message.id)){
    //     index=i
    //   }
    // })
    // if(index && messagesLength!==0){

    // }
    // setMessages([...messages, props.realTimeMessage]);
    // props.setRTMEmpty()
    // setMessagesLength(parseInt(messagesLength + 1));
  };

  const getNotifications = () => {
    fetchRequest(
      api + "api/get-user-notifications?user_id=" + props.userAuthenticatedId,
      "get"
    ).then((response) => {
      if (response.data) {
        setNotifications(response.data);
        setNotificationsLength(response.data.length);
        setDoneLoading(1);
      }
    });
  };

  const getUnreadMessages = () => {
    fetchRequest(
      api +
        "api/get-message-notifications?user_id=" +
        props.userAuthenticatedId,
      "get"
    ).then((response) => {
      if (response.data) {
        setMessages(response.data);
        setMessagesLength(response.data.length);
      }
    });
  };

  const markNotificationsAsRead = (event) => {
    let data = {
      user_id: props.userAuthenticatedId,
    };
    handleClickPopoverNotification(event);
    fetchRequest(api + "api/mark-as-read", "post", data).then((response) => {
      if (response.message === "success") {
        setNotificationsLength();
      }
    });
  };

  const markMessagesAsRead = (event) => {
    handleClickPopoverMessage(event);
    let data = {
      user_id: props.userAuthenticatedId,
    };
    fetchRequest(api + "api/mark-messages-as-read", "post", data).then(
      (response) => {
        if (response.message === "success") {
          setMessagesLength(0);
        }
      }
    );
  };

  const removeNotification = (index) => {
    let notificationUpdates = notifications
      .slice(0, index)
      .concat(notifications.slice(index + 1));
    setNotifications(notificationUpdates);
  };

  useEffect(() => {
    if (!doneLoading) {
      getNotifications();
      getUnreadMessages();
      setDoneLoading(1);
    }
    if (props.rTNotification && doneLoading) {
      realTimeNotifications();
    }

    if (props.realTimeMessage && doneLoading) {
      realTimeMessages();
    }
  }, [props.rTNotification, props.realTimeMessage]);

  return (
    <Fragment>
      {(searchValue && searchResults) && <div style={{zIndex:1,backgroundColor:'white',position:'absolute',top:'45px',width:'150px !important', left:'130px'}}>{searchResults.map(user=><FriendsList key={user.id} friend={user}/>)}</div>}
      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              <SideDrawer />

              {/* <Link style={{ color: "#FFF" }} to="/messenger">
              Messenger
            </Link> */}
            </Typography>
            <Typography className={classes.title} variant="h6" noWrap>
              <Link style={{ color: "#FFF" }} to="/home">
                <HomeIcon />
              </Link>
              {/* <Link style={{ color: "#FFF" }} to="/messenger">
              Messenger
            </Link> */}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                onChange={handleSearchValue}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
              
            </div>
            
            
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                onClick={markMessagesAsRead}
                aria-describedby={id2}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={messagesLength} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              {/* <Button
              aria-describedby={id}
              variant="contained"
              color="primary"
              onClick={handleClickPopoverNotification}
            > */}
              {/* <IconButton aria-label="show 17 new notifications" color="inherit"> */}
              <IconButton
                onClick={markNotificationsAsRead}
                // onClick={handleClickPopoverNotification}
                aria-describedby={id}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={notificationsLength} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {/* </Button> */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>

            <Popover
              id={id2}
              open={open2}
              onClose={handleClosePopoverMessage}
              anchorEl={anchorElPopoverMessage}
              style={{ width: "30%" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {messages.length !== 0 &&
                Array.from(messages).map((message, i) => {
                  return (
                    <Paper key={i} variant="outlined" elevation={3}>
                      <Typography
                        style={{ marginBottom: "10px" }}
                        className={classes.typography}
                      >
                        <pre>
                          <Link to="/messenger">
                            {"You have " +
                              message.unread +
                              " unread " +
                              (message.unread === 1 ? "message" : "messages") +
                              "\nfrom " +
                              message.first_name +
                              " " +
                              message.last_name}
                          </Link>
                        </pre>
                      </Typography>
                    </Paper>
                  );
                })}
              {messages.length === 0 && (
                <Paper variant="outlined" elevation={3}>
                  <Typography
                    style={{ marginBottom: "10px" }}
                    className={classes.typography}
                  >
                    <pre>
                      <Link to="/messenger">You have no messages!</Link>
                    </pre>
                  </Typography>
                </Paper>
              )}
            </Popover>
            <Popover
              id={id}
              open={open}
              onClose={handleClosePopoverNotification}
              anchorEl={anchorElPopoverNotification}
              style={{ width: "30%" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              {/* show every notification depending on its type */}
              {notifications.length !== 0 &&
                Array.from(notifications).map(
                  (notification, i) => {
                    {
                      return notification.type ===
                        "App\\Notifications\\AddRequest" ? (
                        <Paper key={i} variant="outlined" elevation={3}>
                          <FriendRequests
                            index={i}
                            removeNotification={removeNotification}
                            friend={notification.data.user}
                            userAuthenticatedId={props.userAuthenticatedId}
                            showAcceptButton={1}
                          />
                        </Paper>
                      ) : (
                        <Paper variant="outlined" elevation={3}>
                          <Typography
                            noWrap={true}
                            style={{ marginBottom: "10px" }}
                            variant="body1"
                            className={classes.typography}
                          >
                            <div onClick={handleClosePopoverNotification}>
                              <Link
                                to={
                                  notification.type ===
                                  "App\\Notifications\\AcceptFriendRequest"
                                    ? "/profile/" + notification.data.user.id
                                    : "/events"
                                }
                              >
                                {notification.data.message}{" "}
                              </Link>
                            </div>
                          </Typography>
                        </Paper>
                      );
                    }
                  }
                  // <Paper elevation={3}>
                  //   <Typography
                  //     style={{ marginBottom: "10px" }}
                  //     className={classes.typography}
                  //   >
                  //   <pre>{notification.data.message}</pre>
                  //   </Typography>
                  // </Paper>
                )}
              {/* if there are no notifications, show this */}
              {notifications.length === 0 && (
                <Paper variant="outlined" elevation={3}>
                  <Typography
                    style={{ marginBottom: "10px" }}
                    className={classes.typography}
                  >
                    <pre>You have no notifications!</pre>
                  </Typography>
                </Paper>
              )}
            </Popover>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      <div style={{ marginBottom: "50px" }}></div>
    </Fragment>
  );
}

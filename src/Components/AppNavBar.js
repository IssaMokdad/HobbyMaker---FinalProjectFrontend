import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
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
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";


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

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [anchorElPopoverMessage, setAnchorElPopoverMessage] = React.useState(
    null
  );

  const handleClosePopoverMessage = () => {
    setAnchorElPopoverMessage(null);
  };
  const open2 = Boolean(anchorElPopoverMessage);
  const id2 = open2 ? "simple-popover" : undefined;
  const handleClickPopoverMessage = (event) => {
    setAnchorElPopoverMessage(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}><Link to={'/profile/'+props.userAuthenticatedId}>My account</Link></MenuItem>
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
          onClick={handleClickPopoverMessage}
          aria-describedby={id2}
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={4} color="secondary">
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
          onClick={handleClickPopoverNotification}
          aria-describedby={id}
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={19} color="secondary">
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

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar variant='dense'>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link color='white' to='/home'>Home</Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
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
              onClick={handleClickPopoverMessage}
              aria-describedby={id2}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={9} color="secondary">
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
              onClick={handleClickPopoverNotification}
              aria-describedby={id}
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={19} color="secondary">
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
              horizontal: "bottom",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The <Link to="/"> ekhtak</Link> content
                hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>{" "}
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>
            <Typography
              style={{ marginBottom: "10px" }}
              className={classes.typography}
            >
              The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
            </Typography>
          </Popover>
          <Popover
            id={id}
            open={open}
            onClose={handleClosePopoverNotification}
            anchorEl={anchorElPopoverNotification}
            style={{ width: "30%" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "bottom",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The <Link to="/"> ekhtak</Link> content
                hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>{" "}
            <Paper elevation={3}>
              <Typography
                style={{ marginBottom: "10px" }}
                className={classes.typography}
              >
                The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
              </Typography>
            </Paper>
            <Typography
              style={{ marginBottom: "10px" }}
              className={classes.typography}
            >
              The content hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh of the Popover.
            </Typography>
          </Popover>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

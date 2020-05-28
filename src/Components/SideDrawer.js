import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import YouTubeIcon from '@material-ui/icons/YouTube';
import ForumIcon from '@material-ui/icons/Forum';
import EventIcon from '@material-ui/icons/Event';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        
          <ListItem button key={'messenger'}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <Link to='/messenger'><ListItemText primary='Messenger' /></Link>
          </ListItem>
          
          <ListItem button key={'youtube-videos'}>
            <ListItemIcon><YouTubeIcon/></ListItemIcon>
            <Link to='/saved-videos'><ListItemText primary='YT Saved Videos' /></Link>
          </ListItem>
          <ListItem button key={'youtube-videos'}>
            <ListItemIcon><ForumIcon/></ListItemIcon>
            <Link to='/saved-posts'><ListItemText primary='Saved Posts' /></Link>
          </ListItem>
          <ListItem button key={'events'}>
            <ListItemIcon><EventIcon/></ListItemIcon>
            <Link to='/events'><ListItemText primary='Events' /></Link>
          </ListItem>
        
      </List>
      {/* <Divider /> */}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div>
      
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer('left', true)}><Link style={{ color: "#FFF" }}>
            <MenuIcon />
            </Link></Button>
          <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
        </React.Fragment>
      
    </div>
  );
}
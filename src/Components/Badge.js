import React from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';


export default function CustomizedBadges(props) {
  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={props.count} color="secondary" overlap="circle" >
        
      </Badge>
    </IconButton>
  );
}
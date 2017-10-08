import React from 'react';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

export const Menu = (props) => (
  <IconButton
    color="contrast"
    aria-label="open menu"
    onClick={props.handleDrawerOpen}
    className="MenuBtn">  
    <MenuIcon />
  </IconButton>
);

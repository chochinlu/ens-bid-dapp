// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { blueGrey } from 'material-ui/colors';
import MenuIcon from 'material-ui-icons/Menu';
import {WalletDialog} from './WalletDialog';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import HomeIcon from 'material-ui-icons/Home';
import classNames from 'classnames';
import {Title} from './Title';
import {Wallet} from './Wallet';
import './Top.css';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
  hide: {
    display: 'none',
  },
};

class Top extends Component {
  state = {
    open: false,
    menu: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleDrawerOpen = () => {
    this.setState({ menu: true });
  };

  handleDrawerClose = () => {
    this.setState({ menu: false });
  };

  render () {
    const classes = this.props.classes;
    
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="open menu"
              onClick={this.handleDrawerOpen}
              className="MenuBtn">  
              <MenuIcon />
            </IconButton>
            <Title className={classes.flex} />
            <Wallet 
              privateKey={this.props.privateKey}
              onClick={() => this.setState({ open: true })} />
            <WalletDialog 
              open={this.state.open} 
              {...this.props}
              handleRequestClose={this.handleRequestClose}
              />
          </Toolbar>
        </AppBar>
        <Drawer
          type="persistent"
          open={this.state.menu}>
          <div className="Top-Drawer">
            <div className="Top-Drawer-Chevron">
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                  <i className="material-icons">home</i>
                </ListItemIcon>
                <ListItemText primary="ENS.BID" className="Top-Drawer-ListItemText"/>
              </ListItem>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                  <i className="material-icons">view_list</i>
                </ListItemIcon>
                <ListItemText primary="My ENS List" className="Top-Drawer-ListItemText"/>
              </ListItem>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                  <i className="material-icons">gavel</i>
                </ListItemIcon>
                <ListItemText primary="ENS Trade" className="Top-Drawer-ListItemText"/>
              </ListItem>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                  <i className="material-icons">attach_money</i>
                </ListItemIcon>
                <ListItemText primary="ENS Loan" className="Top-Drawer-ListItemText"/>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                <i className="material-icons">help_outline</i>
                </ListItemIcon>
                <ListItemText primary="FAQ" className="Top-Drawer-ListItemText"/>
              </ListItem>
              <ListItem button className="Top-Drawer-ListItem">
                <ListItemIcon>
                  <i className="material-icons">assignment</i>
                </ListItemIcon>
                <ListItemText primary="Terms & Service" className="Top-Drawer-ListItemText"/>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

Top.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Top);
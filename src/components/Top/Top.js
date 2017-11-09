// @flow weak

import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {WalletDialog} from './WalletDialog';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import {Menu} from './Menu';
import {Title} from './Title';
import {Wallet} from './Wallet';
import {Network} from './Network';
import * as labels from '../../constants/menu';
import './Top.css';

const menu = [
  {icon: 'home', name: 'ENS.BID', disabled: false, label: labels.ENS_BID},
  {icon: 'view_list', name: 'My ENS List', disabled: true, label: labels.MY_ENS_LIST},
  {icon: 'gavel', name: 'ENS Trade', disabled: true, label: labels.ENS_TRADE},
  {icon: 'attach_money', name: 'ENS Loan', disabled: true, label: labels.ENS_LOAD},
];

const info = [
  {icon: 'help_outline', name: 'FAQ', disabled: false, label: labels.FAQ},
  {icon: 'assignment', name: 'Disclaimer', disabled: false, label: labels.DISCLAIMER},
  {icon: 'bug_report', name: 'Bug Report', disabled: false, label: labels.BUG_REPORT},
  {icon: 'settings', name: 'ENS Settings', disabled: true, label: labels.SETTINGS},
]

const MenuItem = (props) => (
  <ListItem button 
    className="Top-Drawer-ListItem" 
    disabled={props.disabled}
    onClick={() => props.handleMenuSwitch(props.label)}>
     <ListItemIcon>
        <i className="material-icons">{props.icon}</i>
     </ListItemIcon>
     <ListItemText primary={props.children} className="Top-Drawer-ListItemText"/>
  </ListItem>
); 

class Top extends Component {
  state = {
    menuOpen: false,
    network: 'ropsten',
  };

  handleDrawerOpen = () => {
    this.setState({ menuOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ menuOpen: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleMenuSwitch = (label) => {
    this.props.menuSwitch(label); 
    this.handleDrawerClose();
  }

  render () {
    const menuItems = menu.map(({icon, name, disabled, label}, index) => 
      <MenuItem 
        key={`menu-${index}`} 
        icon={icon} 
        disabled={disabled}
        label={label}
        handleMenuSwitch={this.handleMenuSwitch}>{name}</MenuItem>);
  
    const infoItems = info.map(({icon, name, disabled, label}, index) => 
      <MenuItem 
        key={`menu-${index}`} 
        icon={icon} 
        disabled={disabled}
        label={label}
        menuSwitch={this.props.menuSwitch}
        handleMenuSwitch={this.handleMenuSwitch}>{name}</MenuItem>);

    const menuDrawer = 
      this.state.menuOpen === true &&
      <Drawer
        type="persistent"
        open={this.state.menuOpen}>
        <div className="Top-Drawer">
          <div className="Top-Drawer-Chevron">
            <IconButton onClick={this.handleDrawerClose}>
              <i className="material-icons">chevron_left</i>
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems}
          </List>
          <Divider />
          <List>
            {infoItems}
          </List>
        </div>
      </Drawer>;

    return (
      <div className="Top">
        <AppBar position="static" className="AppBar">
          <Toolbar>
            <Menu handleDrawerOpen={this.handleDrawerOpen}/>
            <Title backToSearch={this.props.backToSearch} />
            <Network network={this.state.network} handleChange={this.handleChange}/>
            <Wallet 
              privateKey={this.props.privateKey}
              onClick={() => this.props.handleOpenWallet()} />
            <WalletDialog
              {...this.props}
              handleRequestClose={this.props.handleCloseWallet}
              />
          </Toolbar>
        </AppBar>
        {menuDrawer}
      </div>
    );
  }
}

export default Top;
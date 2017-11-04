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
import './Top.css';

const menu = [
  {icon: 'home', name: 'ENS.BID', disabled: false},
  {icon: 'view_list', name: 'My ENS List', disabled: true},
  {icon: 'gavel', name: 'ENS Trade', disabled: true},
  {icon: 'attach_money', name: 'ENS Loan', disabled: true},
];

const info = [
  {icon: 'help_outline', name: 'FAQ', disabled: true},
  {icon: 'assignment', name: 'Disclaimer', disabled: true},
  {icon: 'bug_report', name: 'Bug Report', disabled: true}
]

const MenuItem = (props) => (
  <ListItem button className="Top-Drawer-ListItem" disabled={props.disabled}>
     <ListItemIcon>
        <i className="material-icons">{props.icon}</i>
     </ListItemIcon>
     <ListItemText primary={props.children} className="Top-Drawer-ListItemText"/>
  </ListItem>
); 

const menuItems = menu.map(({icon, name, disabled}, index) => 
  <MenuItem key={`menu-${index}`} icon={icon} disabled={disabled}>{name}</MenuItem>);

const infoItems = info.map(({icon, name, disabled}, index) => 
  <MenuItem key={`menu-${index}`} icon={icon} disabled={disabled}>{name}</MenuItem>);

const MenuDrawer = (props) => (
  <Drawer
    type="persistent"
    open={props.menuOpen}>
  <div className="Top-Drawer">
    <div className="Top-Drawer-Chevron">
      <IconButton onClick={props.handleDrawerClose}>
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
</Drawer>
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

  render () {
    const menuDrawer = this.state.menuOpen === true && <MenuDrawer menuOpen={this.state.menuOpen} handleDrawerClose={this.handleDrawerClose}/>
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
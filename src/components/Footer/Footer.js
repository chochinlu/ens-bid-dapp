import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { blueGrey } from 'material-ui/colors';
import './Footer.css';

class Footer extends Component {
  render () {
    const classes = this.props.classes;
    
    return (
      <AppBar position="static" style={{ backgroundColor: blueGrey[900] }} className="Footer">
        <div>
          © Copyright 2017 ENS.BID - All Rights Reserved
        </div>
      </AppBar>
    )
  }
};

export default Footer;
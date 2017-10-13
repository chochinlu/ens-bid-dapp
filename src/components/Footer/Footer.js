import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { blueGrey } from 'material-ui/colors';
import './Footer.css';

class Footer extends Component {
  render () {
    const classes = this.props.classes;
    
    return (
      <AppBar position="static" className="Footer">
        <div className="Footer-info">
          <a href="#">FAQ</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy</a>
        </div>
        <div className="Footer-copyright">
          © Copyright 2017 ENS.BID
        </div>
      </AppBar>
    )
  }
};

export default Footer;
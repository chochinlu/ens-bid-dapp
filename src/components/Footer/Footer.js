import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './Footer.css';

class Footer extends Component {
  render () {
    return (
      <AppBar position="static" className="Footer">
        <div className="Footer-info">
          <a>FAQ</a>
          <a>Terms of Service</a>
          <a>Privacy</a>
        </div>
        <div className="Footer-copyright">
          © Copyright 2017 ENS.BID
        </div>
      </AppBar>
    )
  }
};

export default Footer;
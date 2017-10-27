import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        {/* <div className="Footer-info">
          <a>FAQ</a>
          <a>Terms of Service</a>
          <a>Privacy</a>
        </div> */}
        <div className="Footer-copyright">
          <p>© Copyright 2017 ENS.BID</p>
        </div>
      </div>
    )
  }
};

export default Footer;
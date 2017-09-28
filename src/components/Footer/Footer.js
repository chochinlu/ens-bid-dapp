import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import './Footer.css';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
};

class Footer extends Component {
  render () {
    return (
      <footer>
        © Copyright 2017 ENS.BID - All Rights Reserved
      </footer>
    )
  }
};

Footer.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Footer);
// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { blueGrey } from 'material-ui/colors';
import {WalletDialog} from './WalletDialog';
import {Title} from './Title';
import {Wallet} from './Wallet';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
};

class DappBar extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render () {
    const classes = this.props.classes;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
          <Toolbar>
            <Title className={classes.flex} />
            <Wallet onClick={() => this.setState({ open: true })} />
            <WalletDialog open={this.state.open} onRequestClose={this.handleRequestClose} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

DappBar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(DappBar);
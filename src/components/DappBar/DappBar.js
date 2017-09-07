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
import './DappBar.css';

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

    const account = this.props.account && 
      <p className="DappBar-info">{this.props.account}</p>;

    const balance = this.props.balance && 
      <p className="DappBar-info">Balance: {this.props.balance}</p>;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
          <Toolbar>
            <Title className={classes.flex} />
            {account}
            {balance}
            <Wallet onClick={() => this.setState({ open: true })} />
            <WalletDialog 
              open={this.state.open} 
              {...this.props}
              />
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
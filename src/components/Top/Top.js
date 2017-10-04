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
import './Top.css';

const styles = {
  root: {
    width: '100%'
  },
  flex: {
    flex: 1
  },
};

class Top extends Component {
  state = {
    open: false,
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  render () {
    const classes = this.props.classes;

    const account = this.props.account && 
      <p className="Top-info">{this.props.account}</p>;

    const balance = this.props.balance && 
      <p className="Top-info">Balance: {this.props.balance}</p>;

    const privateKey = this.props.privateKey &&
    <p className="Top-info">PrivateKey: {this.props.privateKey}</p>;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
          <Toolbar>
            <Title className={classes.flex} />
            <Wallet onClick={() => this.setState({ open: true })} />
            <WalletDialog 
              open={this.state.open} 
              {...this.props}
              handleRequestClose={this.handleRequestClose}
              />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Top.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Top);
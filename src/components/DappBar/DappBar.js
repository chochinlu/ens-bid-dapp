// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { blueGrey } from 'material-ui/colors';
import {LoginDialog} from './LoginDialog';
import {Menu} from './Menu';
import {Title} from './Title';
import {Login} from './Login';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
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
            <Menu />
            <Title className={classes.flex} />
            <Login onClick={() => this.setState({ open: true })} />
            <LoginDialog open={this.state.open} onRequestClose={this.handleRequestClose} />
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
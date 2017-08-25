// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { blueGrey } from 'material-ui/colors';
import {getAddressBalance} from '../../lib/dAppService';
import SearchIcon from 'material-ui-icons/Search';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

class AccountBar extends Component {
  state = {
    address: '0x7c20badacd20f09f972013008b5e5dae82670c8d',
    balance: '0'
  };

  componentDidMount() {
    this.handleAddressBalanceLoad();
  }

  handleAddressBalanceLoad = async () => {
    try {
      const balance = getAddressBalance(this.state.address);
      this.setState({ balance });
    } catch (error) {
      console.error(`getAddressBalanceLoad error: ${error} `);
      this.setState({ balance: error });
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({address: e.target.value});
  }

  handleClick = (e) => {
    e.preventDefault();
    this.handleAddressBalanceLoad();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: blueGrey[200] }}>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.flex}>
              <TextField
                label="ETH Address"
                placeholder={this.props.initAddress}
                className={classes.textField}
                defaultValue={this.state.address}
                color="white"
                onChange={this.handleChange}
              />
              <Button fab color="primary" aria-label="add" className={classes.button} onClick={this.handleClick}>
                <SearchIcon />
              </Button>
            </Typography>
            <Typography type="title" color="inherit" className={classes.flex}>
              Balance: {this.state.balance}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AccountBar);
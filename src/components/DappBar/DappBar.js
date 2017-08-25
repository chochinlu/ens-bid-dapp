// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Dialog, {
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import { blueGrey } from 'material-ui/colors';
import { JsonKeyUploader } from '../JsonKeyUploader';

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
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              ENS Bid Dapp
            </Typography>
            <Button color="contrast" onClick={() => this.setState({ open: true })}>Login</Button>
            <Dialog open={this.state.open} transition={Slide} onRequestClose={this.handleRequestClose}>
              <DialogTitle>
                {"Upload your keystore file in JSON format"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  We will not backup your keystore in database. Please take care your file.
                  <JsonKeyUploader />
                </DialogContentText>
              </DialogContent>
            </Dialog>
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
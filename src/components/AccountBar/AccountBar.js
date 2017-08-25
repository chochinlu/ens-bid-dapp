// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { blueGrey } from 'material-ui/colors';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
};

function AccountBar(props) {
  const classes = props.classes;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: blueGrey[900] }}>
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            Balance
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AccountBar);
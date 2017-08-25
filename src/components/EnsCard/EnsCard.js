// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import AddBoxIcon from 'material-ui-icons/AddBox';
import GavelIcon from 'material-ui-icons/Gavel';
import logo from '../../logo.png';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function EnsCard(props) {
  const classes = props.classes;

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={logo}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline">Yanlong.eth</Typography>
            <Typography type="subheading" color="secondary">
              laiyanlong@gmail.com
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Play/pause">
              <AddBoxIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="GavelIcon">
              <GavelIcon />
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}

EnsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnsCard);
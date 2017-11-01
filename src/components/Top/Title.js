import React from 'react';
import Typography from 'material-ui/Typography';
import './Title.css';

export const Title = (props) => {
  return (
    <Typography type="title" color="inherit" align="left" className="Title">
      <span className="Title-name" onClick={() => props.backToSearch()}>ENS.BID</span>
    </Typography>
  );
};
import React from 'react';
import Typography from 'material-ui/Typography';

export const Title = (props) => {
  return (
    <Typography type="title" color="inherit" className={props.className}>
      ENS Bid Dapp
    </Typography>
  );
};
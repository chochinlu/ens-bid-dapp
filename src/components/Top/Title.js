import React from 'react';
import Typography from 'material-ui/Typography';

export const Title = (props) => {
  return (
    <Typography type="title" color="inherit" align='left' className={props.className}>
      ENS.BID
    </Typography>
  );
};
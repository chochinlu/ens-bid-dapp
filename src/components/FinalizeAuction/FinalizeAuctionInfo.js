// @flow weak
import React from 'react';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './FinalizeAuctionInfo.css';

export const FinalizeAuctionInfo = (props) => (
  // TODO switch FinalizeAuctionInfo when Success
  <Card raised>
    <CardContent>
      <Typography type="title" component="div">
        ENS: {props.searchName}.eth
      </Typography>
      <Typography type="title" component="div">
        Congratulations! You've owned the {props.searchName}.eth domain name!
      </Typography>
      <CardActions>
        <Button raised onClick={() => props.switchPage('main')}>
          BACK TO SEARCH
        </Button>
        <Button raised>MY ENS LIST</Button>
      </CardActions>
    </CardContent>
  </Card>
);
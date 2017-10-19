import React from 'react';
import moment from 'moment';
import {fromNow} from '../../lib/util';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './RevealAuctionInfo.css';

export const RevealAuctionInfo = (props) => {
  const endsFromNow = fromNow(props.registratesAt);
  const txHashUrl = process.env.REACT_APP_ETHERSCAN_URL + props.revealTXHash;

  return (
    <Card raised className="RevealAuctionInfo">
      <CardContent>
        <Typography type="title" component="div">
          ENS: {props.searchResult.searchName}.eth
        </Typography>
        <Typography type="title" component="div">
          <p>Finalize Auction On</p>
          <div>{props.registratesAt.toString()}</div>
          <div>{endsFromNow.toString()}</div>
        </Typography>
        <Typography type="title" component="div">
          Email: {props.email}
        </Typography>
        <Typography type="title" component="div">
          ETH: {props.ethBid}
        </Typography>
        <Typography type="title" component="div">
          Secret: {props.secret}
        </Typography>
        <Typography type="title" component="div">
          TxHash: <a target='_blank' href={txHashUrl}>{props.revealTXHash}</a>
        </Typography>
        <CardActions className="RevealAuctionInfo-button">
          <Button raised onClick={() => props.switchPage('main')}>BACK TO SEARCH</Button>
          <Button raised>MY ENS LIST</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
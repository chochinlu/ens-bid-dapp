import React from 'react';
import {momentFromNow} from '../../lib/util';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import './StartAuctionInfo.css';

export const StartAuctionInfo = (props) => {
  const endsMomentFromNow = momentFromNow(props.unsealStartsAt);
  const hidden = props.registratesAt.year() === 1970;
  const ethersacnUrl = process.env.REACT_APP_ETHERSCAN_URL || 'https://ropsten.etherscan.io/tx/';
  const txHashUrl = ethersacnUrl + props.auctionTXHash;

  return (
    <Card raised className="StartAuctionInfo">
      <CardContent>
        <Typography type="title" component="div">
          ENS: {props.searchResult.searchName}.eth
        </Typography>
        { hidden ? null :
          (
            <Typography type="title" component="div">
              <p>Reveal Auction On</p>
              <div>{props.unsealStartsAt.toString()}</div>
              <div>{endsMomentFromNow.toString()}</div>
            </Typography>
          )
        }
        {/* <Typography type="title" component="div">
          Email: {props.formResult.email}
        </Typography> */}
        <Typography type="title" component="div">
          ETH: {props.formResult.ethBid}
        </Typography>
        <Typography type="title" component="div">
          Secret: {props.formResult.secret}
        </Typography>
        <Typography type="title" component="div">
          TxHash: <a target='_blank' href={txHashUrl}>{props.auctionTXHash}</a>
        </Typography>
        <CardActions className="StartAuctionInfo-button">
          <Button raised onClick={() => props.switchPage('main')}>BACK TO SEARCH</Button>
          <Button raised>MY ENS LIST</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
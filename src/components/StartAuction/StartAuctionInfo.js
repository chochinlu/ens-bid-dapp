import React from 'react';
import {shortFormatHash, momentFromNow} from '../../lib/util';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import './StartAuctionInfo.css';

const RevealAuctionOn = (props) =>
  <div className="RevealAuctionOn">
    <h4>Reveal Auction On:</h4>
    <p>{props.unsealStartsAt}</p>
    <p>{props.endsMomentFromNow}</p>
    <Divider />
  </div>;

const InfoItem = (props) => {
  let classes = '';
  if (props.title === 'ENS') classes = 'eth-item';
  if (props.title === 'TxHash') classes = 'eth-txhash';
  if (props.title === 'JSON') classes = 'eth-json';

  return (
    <div className="StartAuctionInfo-info-item">
      <p>
        <span>{props.title}:</span>
        <span className={classes}>{props.children}</span>
      </p>
      <Divider />
    </div>
  );
};

export const StartAuctionInfo = (props) => {
  const endsMomentFromNow = momentFromNow(props.unsealStartsAt);
  const hidden = (props.registratesAt.year() - 1970) <= 0 ;
  const ethersacnUrl = process.env.REACT_APP_ETHERSCAN_URL || 'https://ropsten.etherscan.io/tx/';
  const txHashUrl = ethersacnUrl + props.auctionTXHash;

  const revealAuctionOn = !props.hidden && 
    <RevealAuctionOn 
      unsealStartsAt={props.unsealStartsAt.toString()}
      endsMomentFromNow={endsMomentFromNow.toString()}
    />;

  const {ethBid, ethMask, secret} = props.formResult;

  const shorterTxHash = shortFormatHash(props.auctionTXHash);

  const itemTitleValue = [
    {title: 'ENS', value: `${props.searchResult.searchName}.eth`},
    {title: 'ETH Bid', value: ethBid},
    {title: 'ETH Mask', value: ethMask},
    {title: 'Secret', value: secret},
    {title: 'TxHash', value: <a target='_blank' href={txHashUrl}>{shorterTxHash}</a>},
    {title: 'JSON', value: JSON.parse(props.exportJson)}
  ];

  const infoItems = itemTitleValue.map(({title, value}, index) =>
    <InfoItem key={`infoItem-${index}`} title={title}>{value}</InfoItem>
  );

  return (
    <Card raised >
      <div className="StartAuctionInfo">
        {revealAuctionOn}       
        {infoItems}
        <div className="StartAuctionInfo-actions">
          <Button raised onClick={() => props.switchPage('main')}>BACK TO SEARCH</Button>
          <Button raised>MY ENS LIST</Button>
        </div>
      </div>  
    </Card>
  );
}
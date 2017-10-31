import React from 'react';
import {shortFormatHash, momentFromNow} from '../../lib/util';
import Button from 'material-ui/Button';
import Card from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import './RevealAuctionInfo.css';

const FinalizeAuctionOn = (props) =>
  <div className='FinalizeAuctionOn'>
    <h4>Finalize Auction On:</h4>
    <p>{props.registratesAt}</p>
    <p>{props.endsMomentFromNow}</p>
    <Divider />
  </div>;

const InfoItem = (props) => {
  let classes = '';
  if (props.title === 'ENS') classes = 'eth-item';
  if (props.title === 'TxHash') classes = 'eth-txhash';
  if (props.title === 'JSON') classes = 'eth-json';

  return (
    <div className='RevealAuctionInfo-info-item'>
      <p>
        <span>{props.title}:</span>
        <span className={classes}>{props.children}</span>
      </p>
      <Divider />
    </div>
  )
}

export const RevealAuctionInfo = (props) => {
  const endsMomentFromNow = momentFromNow(props.registratesAt);
  const hidden = (props.registratesAt.year() - 1970) <= 0;
  const ethersacnUrl = process.env.REACT_APP_ETHERSCAN_URL || 'https://ropsten.etherscan.io/tx/';
  const txHashUrl = ethersacnUrl + props.revealTXHash;

  const finalizeAuctionOn = !hidden &&
    <FinalizeAuctionOn
      registratesAt={props.registratesAt.toString()}
      endsMomentFromNow={endsMomentFromNow.toString()}
    />;

  const {ethBid, secret} = props.formResult

  const shorterTxHash = shortFormatHash(props.revealTXHash);

  const itemTitleValue = [
    {title: 'ENS',      value: `${props.searchResult.searchName}.eth`},
    {title: 'ETH Bid',  value: ethBid},
    {title: 'Secret',   value: secret},
    {title: 'TxHash',   value: <a target='_blank' href={txHashUrl}>{shorterTxHash}</a>},
    {title: 'JSON',     value: JSON.parse(props.exportJson)}
  ];

  const infoItems = itemTitleValue.map(({title, value}, index) => 
    <InfoItem key={`infoItem-${index}`} title={title}>{value}</InfoItem>
  );

  return (
    <Card raised>
      <div className='RevealAuctionInfo'>
        {finalizeAuctionOn}
        {infoItems}
        <div className='RevealAuctionInfo-actions'>
          <Button raised onClick={() => props.backToSearch()}>BACK TO SEARCH</Button>
          <Button raised>MY ENS LIST</Button>
        </div>
      </div>
    </Card>
  );
};
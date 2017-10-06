import React from 'react';
import moment from 'moment'
import classNames from 'classnames/bind';
import './RevealAuctionInfo.css';

export const RevealAuctionInfo = (props) => {
  const endsFromNow = moment(props.endsAt).fromNow();
  return (
    <div>
      <h2>{props.searchName}.eth</h2>
      <div>
        <p>Auction Closes On</p>
        <div>{props.endsAt}</div>
        <div>{endsFromNow}</div>
      </div>
      <div>
        <div>
          <div>Email: </div>
          <div>
            {props.email}
          </div>
        </div>
        <div>
          <div>ETH: </div>
          <div>
            {props.ethBid}
          </div>
        </div>
        <div>
          <div>TxHash: </div>
          <div>
            {props.revealTXHash}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => props.switchPage('main')}>Back to Search</button>
        <button onClick={() => props.setStep('FinalizeAuction')}>Finalize</button>
      </div>
    </div>
  );
};
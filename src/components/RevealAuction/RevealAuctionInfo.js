import React from 'react';
import './RevealAuctionInfo.css';

export const RevealAuctionInfo = (props) => (
  <div>
    <h2>{props.searchName}.eth</h2>
    <div>
      Timeline
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
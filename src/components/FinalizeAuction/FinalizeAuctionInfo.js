// @flow weak

import React from 'react';
import './FinalizeAuctionInfo.css';

export const FinalizeAuctionInfo = (props) => (
  // TODO switch FinalizeAuctionInfo when Success
  <div>
    <h2>{props.searchName}.eth</h2>
    <p>
      Congratulations! You've owned the {props.searchName}.eth domain name!
    </p>
    <div>
      <button onClick={() => props.switchPage('main')}>Back to Search</button>
    </div>
  </div>
);
// @flow weak

import React from 'react';
import {StartAuctionForm} from './StartAuctionForm';
// import {StartAuctionInfo} from './StartAuctionInfo';
import './StartAuction.css';

export const StartAuction = (props) => (
  // TODO switch display between StartAuctionInfo an StartAuctionForm
  // TODO add back AuctionStepper
  <div>
    
    <StartAuctionForm searchResult={props.searchResult} />
  </div>
);
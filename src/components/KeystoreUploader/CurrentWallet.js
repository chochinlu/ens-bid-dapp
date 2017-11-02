import React from 'react';

export const CurrentWallet = (props) => (
  <div className="CurrentWallet">
    <h2>Current Wallet</h2>
    <p className="CurrentWallet-address">
      <span>Address:</span> 
      <span>{props.address}</span>
    </p>
    <p><span>Balance:</span> {props.balance}</p>
  </div>
);
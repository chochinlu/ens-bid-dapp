import React from 'react';
import './CurrentWallet.css';

export const CurrentWallet = (props) => (
  <div className="CurrentWallet">
    <h2>Current Wallet</h2>
    <p>
      <span>Address: </span> 
      {props.address}
    </p>
    <p>
      <span>Balance: </span>
      {props.balance} ETH
    </p>
  </div>
);
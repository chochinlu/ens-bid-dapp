import React from 'react';
import {getAddressBalance} from '../../lib/dAppService';

export const CurrentWallet = (props) => {
  return props.privateKey && 
    <div className="CurrentWallet">
      <h2>Current Wallet</h2>
      <p className="CurrentWallet-address">
        <span>Address:</span> 
        <span>{props.address}</span>
      </p>
      <p><span>Balance:</span> {getAddressBalance(props.address)}</p>
    </div>
};
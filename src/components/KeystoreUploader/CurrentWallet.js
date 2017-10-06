import React from 'react';
import {getAddressBalance} from '../../lib/dAppService';

export const CurrentWallet = (props) => {
  return props.privateKey 
    ? (
      <div>
        <h2>Current Wallet</h2>
        <p>Address: {this.props.address}</p>
        <p>Balance: {getAddressBalance(this.props.address)}</p>
      </div>
    ) : null;
};
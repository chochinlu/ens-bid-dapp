import React from 'react';
import Button from 'material-ui/Button';
import './Wallet.css';

export const Wallet = (props) => {
  const unlockWallet = props.privateKey && "unlock";
  return (
    <Button className={unlockWallet} color="contrast" onClick={props.onClick}>
      <i className="material-icons">account_balance_wallet</i>
      <div className="WalletText">Wallet</div>
    </Button>
  );
};
import React from 'react';
import Dialog, {DialogContent, DialogTitle} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {JsonKeyUploader} from '../JsonKeyUploader';
import {MetaMaskWallet} from '../MetaMaskWallet/MetaMaskWallet';
import Button from 'material-ui/Button';

const WalletBtn = (props) => {
  const setSource = () => props.setSource(props.type);
  const color = props.type === props.source ? 'accent': 'default';

  return (
    <Button raised color={color} onClick={setSource} className="WalletBtn">
      {props.children}
    </Button>
  );
}

export const WalletDialog = (props) => {

  const metaMaskWallet = props.source === 'metamask' && 
    <MetaMaskWallet {...props} />;

  const jsonUploader = props.source === 'json' && 
    <JsonKeyUploader setAccount={props.setAccount} />;

  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle>
        {"Choose your wallet: "} 
        <WalletBtn setSource={props.setSource} type='metamask' source={props.source}>MetaMask</WalletBtn>
        <WalletBtn setSource={props.setSource} type='json' source={props.source}>JSON keystore file</WalletBtn>
      </DialogTitle>
      <DialogContent>
        {metaMaskWallet}
        {jsonUploader}
      </DialogContent>
    </Dialog>
  );
};
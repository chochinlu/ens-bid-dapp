import React from 'react';
import Dialog, {DialogContent, DialogTitle} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import {KeystoreUploader} from '../KeystoreUploader';
import {MetaMaskWallet} from '../MetaMaskWallet/MetaMaskWallet';
import Button from 'material-ui/Button';

const WalletBtn = (props) => {
  const setSource = () => props.setSource(props.type);
  const color = props.type === props.source ? 'accent': 'default';

  return (
    <Button raised color={color} onClick={setSource} className="WalletBtn" disabled={props.disabled}>
      {props.children}
    </Button>
  );
}

export const WalletDialog = (props) => {

  const keystoreUploader = props.source === 'keystore' && 
    <KeystoreUploader setAccount={props.setAccount} />;

    const metaMaskWallet = props.source === 'metamask' && 
    <MetaMaskWallet {...props} />;

  return (
    <Dialog open={props.open} transition={Slide} onRequestClose={props.handleRequestClose}>
      <DialogTitle>
        {"Choose your wallet: "} 
        <WalletBtn setSource={props.setSource} type='keystore' source={props.source} disabled={false}>Keystore file</WalletBtn>
        <WalletBtn setSource={props.setSource} type='metamask' source={props.source} disabled={true}>MetaMask</WalletBtn>
      </DialogTitle>
      <DialogContent>
        {keystoreUploader}
        {metaMaskWallet}
      </DialogContent>
    </Dialog>
  );
};
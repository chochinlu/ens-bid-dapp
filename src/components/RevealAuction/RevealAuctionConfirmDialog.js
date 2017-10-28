import React, {Component} from 'react';
import {unsealBid, getRegistrarAddress} from '../../lib/ensService';
import {getEstimateGas, getTransactionFee} from '../../lib/dAppService';
import List  from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent} from 'material-ui/Dialog';
import './RevealAuctionConfirmDialog.css';

const ConfirmListItem = (props) => {
  const specialName = ['From', 'To'];
  const classes = specialName.includes(props.name) && 'address';

  return (
    <div className='RevealAuctionConfirmDialog-list-item'>
      <p>{props.name}:</p>
      <p className={classes}>{props.info}</p>
      <Divider/>
    </div>
  );
}

export class RevealAuctionConfirmDialog extends Component {

  payload() {
    const {searchResult: {searchName}, privateKey} = this.props;
    const {ethBid, secret, gas} = this.props.inputResult;

    return unsealBid(searchName, ethBid, secret, privateKey, gas);
  }

  getFeeString() {
    const {gas} = this.props.inputResult;
    const estimateGas = getEstimateGas(this.payload());
    const transactionFee = getTransactionFee(gas, estimateGas);

    return `${gas} Gwei * ${estimateGas} = ${transactionFee} ETH`;
  }

  formInfo = () => ({
    From: `${this.props.address}`,
    To: getRegistrarAddress(),
    Fee:  this.getFeeString(),
    ETH: `${this.props.inputResult.ethBid} ETH`
  })

  inputResultList() {
    const formInfo = this.formInfo();
    return (
      <List>
        {
          Object
            .keys(formInfo)
            .map((key, index) => 
              <ConfirmListItem
                key={`input-${index}`}
                name={key}
                info={formInfo[key]} />)
        }
      </List>
    );
  }

  render() {
    const {open, handleClose} = this.props;
    const inputResultList = this.inputResultList();

    return (
      <Dialog open={open} onRequestClose={handleClose}>
        <div className='RevealAuctionConfirmDialog'>
          <h4 className='RevealAuctionConfirmDialog-title'>Confirm Reveal Auction Information</h4>
          <DialogContent>
            {inputResultList}
          </DialogContent>
          <div className='RevealAuctionConfirmDialog-action-block'>
            <DialogActions>
              <Button raised onClick={handleClose}>Cancel</Button>
              <Button 
                raised
                className='KeystoreUploader-button'
                onClick={() => this.props.handelRevealFormSubmit(this.props.inputResult)}>
                Submit
              </Button>
            </DialogActions>
          </div>
        </div>
      </Dialog>
    );
  }
}
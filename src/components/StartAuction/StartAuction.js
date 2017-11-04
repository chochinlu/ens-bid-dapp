// @flow weak
import React, {Component} from 'react';
import {startAuctionAndBid, newBid, validateStartAuctionBid} from '../../lib/ensService';
import {sendRawTransaction, ensJsonExport, getAddressByPrivateKey} from '../../lib/dAppService';
import {StartAuctionForm} from './StartAuctionForm';
import {StartAuctionInfo} from './StartAuctionInfo';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import './StartAuction.css';

const handleStartAuctionProcess = async (inputObj) => {
  const {state, domainName, ethBid, ethMask, secret, privateKey, gas} = inputObj;

  let returnObj = {
    txHash: '',
    exportJson: '',
    errMsg: undefined
  }

  const validateObj = validateStartAuctionBid(domainName, ethBid, secret, privateKey);
  if (!validateObj.validate) {
    returnObj.errMsg = validateObj.err;
    return returnObj;
  };

  const payload = (state === 'Auction') ? 
    newBid(domainName, ethBid, ethMask, secret, privateKey, gas) :
    startAuctionAndBid(domainName, ethBid, ethMask, secret, privateKey, gas);

  try {
    returnObj.txHash = await sendRawTransaction(payload);
    const address = await getAddressByPrivateKey(privateKey)
    returnObj.exportJson = await ensJsonExport(domainName, ethBid, secret, address);
  } catch (error) {
    returnObj.errMsg = `${state} async error : ${error}`;
  }

  return returnObj;      
};

export class StartAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctionFormSent: '',
      auctionTXHash: '',
      open: false,
      message: '',
      checked: false,
      formResult: {},
      exportJson: ''
    }
    this.setAuctionFormResultState = this.setAuctionFormResultState.bind(this);
    this.handleAuctionFormSubmit = this.handleAuctionFormSubmit.bind(this);
  }

  setAuctionFormResultState(resultObj) {
    this.setState({
      auctionTXHash:   resultObj.hash,
      exportJson:      resultObj.exportJson,
      auctionFormSent: resultObj.state,
      formResult: {
        ethBid: resultObj.inputResult.ethBid,
        ethMask: resultObj.inputResult.ethMask,
        secret: resultObj.inputResult.secret
      }
    })
  }

  handleMessageOpen = msg => this.setState({ open: true, message: msg });

  handleMessageClose = () => this.setState({ open: false });
  
  handleAuctionFormSubmit(inputResult) {

    if (!(this.props.address && this.props.privateKey)) {
      this.handleMessageOpen('Please unlock wallet before bid ENS.');
      return;
    }

    const {ethBid, ethMask, secret, gas} = inputResult;
    const inputObject = {
      state:      this.props.searchResult.state,
      domainName: this.props.searchResult.searchName,
      privateKey: this.props.privateKey,
      ethBid,
      ethMask,
      secret,
      gas
    };

    handleStartAuctionProcess(inputObject).then((result) => {
      if (result.errMsg === undefined) {
        const resultObj = {
          hash: result.txHash,
          exportJson: JSON.stringify(JSON.stringify(result.exportJson)),
          state: 'sent',
          inputResult: {
            ethBid: inputResult.ethBid,
            ethMask: inputResult.ethMask,
            secret: inputResult.secret,
            gas: inputResult.gas
          }
        }
        this.setAuctionFormResultState(resultObj);
      } else {
        // TODO
        // not yet refactoring error message
        this.handleMessageOpen(result.errMsg);
      }
    });
  }

  startAuctionPage() {
    return (this.state.auctionFormSent === 'sent') ? (
      <StartAuctionInfo
        {...this.props}
        {...this.state}
      />
    ) : (
      <StartAuctionForm
        {...this.props}
        {...this.state}
        handleAuctionFormSubmit={this.handleAuctionFormSubmit}
        handleMessageOpen={this.handleMessageOpen}
      />
    );
  }

  snack() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        open={this.state.open}
        onRequestClose={this.handleMessageClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleMessageClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }

  render() {
    const startAuctionPage = this.startAuctionPage();
    const snack = this.snack();
    return (
      <div>
        {startAuctionPage}
        {snack}
      </div>
    );
  }
}
// @flow weak
import React, {Component} from 'react';
import {Warnings} from '../Common/Warnings';
import {finalizeAuction} from '../../lib/ensService';
import {sendRawTransaction} from '../../lib/dAppService';
import {FinalizeAuctionInfo} from './FinalizeAuctionInfo';
import {FinalizeAuctionForm} from './FinalizeAuctionForm';
import './FinalizeAuction.css';

export class FinalizeAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalFormSent: '',
      warningOpen: false,
      warningMessage: ''
    }

    this.setFinalFormSent = this.setFinalFormSent.bind(this);
    this.handleWarningMessageClose = this.handleWarningMessageClose.bind(this);
    this.handleWarningMessageOpen = this.handleWarningMessageOpen.bind(this);
  }

  setFinalFormSent(state) {
    this.setState({finalFormSent: state});
  }

  handleWarningMessageClose() {
    this.setState({warningOpen: false});
  }

  handleWarningMessageOpen(msg) {
    this.setState({warningOpen: true, warningMessage: msg});
  }

  finalizeAuctionInfo = () => (
    <FinalizeAuctionInfo
      searchName={this.props.searchResult.searchName}
      switchPage={this.props.switchPage}
    />
  );

  finalizeAuctionForm = () => (
    <FinalizeAuctionForm
      {...this.props}
      {...this.state}
      setFinalFormSent={this.setFinalFormSent}
      handleChange={this.handleChange}
      handleFormSubmit={this.handleFormSubmit}
    />
  )

  render() {
    return(
      <div>
        {this.state.finalFormSent === 'sent' ?
        this.finalizeAuctionInfo() : this.finalizeAuctionForm()}
        <Warnings
          warningOpen={this.state.warningOpen}
          warningMessage={this.state.warningMessage}
          handleWarningMessageClose={this.handleWarningMessageClose}
        />
      </div>
    )
  }
}

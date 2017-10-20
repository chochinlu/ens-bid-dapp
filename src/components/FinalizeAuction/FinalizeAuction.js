// @flow weak
import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {finalizeAuction} from '../../lib/ensService';
import {momentFromNow, getDuringReveal} from '../../lib/util';
import {FinalizeAuctionInfo} from './FinalizeAuctionInfo';
import './FinalizeAuction.css';

const FinalizeAuctionForm = (props) => (
  <div>
    <h2>{props.searchResult.searchName}.eth</h2>
    <div>
      <p>Finalize Auction On</p>
      <div>{props.registratesAt.toString()}</div>
      <div>Finalization</div>
    </div>
    <div>
      <form onSubmit={props.handleFormSubmit}>
        <div>
          <label>
            Email:
            <input
              name="email"
              type="email"
              placeholder="youremail@example.com"
              value={props.email}
              onChange={props.handleChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
);

export class FinalizeAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      finalFormSent: ''
    }

    this.setFinalFormSent = this.setFinalFormSent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  setFinalFormSent(state) {
    this.setState({finalFormSent: state});
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  // only success scenario
  handleFormSubmit(event) {
    event.preventDefault();
    const privateKey = this.props.privateKey;
    finalizeAuction(this.props.searchResult.searchName, privateKey);
    // TODO
    //   if success turn to info component
    //   if not show error
    this.setFinalFormSent('sent');
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
      setFinalFormSent={this.setFinalFormSent}
      handleChange={this.handleChange}
      handleFormSubmit={this.handleFormSubmit}
    />
  )

  render = () => this.state.finalFormSent === 'sent' ?
  this.finalizeAuctionInfo() : this.finalizeAuctionForm();
}

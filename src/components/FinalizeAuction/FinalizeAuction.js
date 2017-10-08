// @flow weak
import React, {Component} from 'react';
import moment from 'moment'
import classNames from 'classnames/bind';
import {finalizeAuction} from '../../lib/ensService';
import {fromNow, getDuringReveal} from '../../lib/util';
import {FinalizeAuctionInfo} from './FinalizeAuctionInfo';
import './FinalizeAuction.css';

const FinalizeAuctionForm = (props) => {
  const timelineState = classNames(props.duringReveal === 'during' ? 'hidden' : null);
  return (
    <div>
      <h2>{props.searchResult.searchName}.eth</h2>
      <div>
        <p>Auction Closes On</p>
        <div>{props.endsAt}</div>
        { props.duringReveal === 'expired' ? (
            <div>Finalization</div>
          ) : (
            <div>{fromNow(props.endsAt)}</div>
          )
        }
      </div>
      <div className={timelineState}>
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
}

export class FinalizeAuction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endsAt: '',
      duringReveal: '',
      email: '',
      finalFormSent: ''
    }

    this.setFinalFormSent = this.setFinalFormSent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // TODO
    // request api to get startsAt and endsAt
    const endsAt = '';
    this.setState({endsAt});
    const duringReveal = getDuringReveal(null, endsAt);

    this.setState({duringReveal});
  }

  setFinalFormSent(state) {
    this.setState({finalFormSent: state});
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  // only success scenario and no async
  handleFormSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const privateKey = this.props.privateKey;
    finalizeAuction(email, privateKey);
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
      endsAt={this.state.endsAt}
      setFinalFormSent={this.setFinalFormSent}
      handleChange={this.handleChange}
      handleFormSubmit={this.handleFormSubmit}
    />
  )

  render = () => this.state.finalFormSent === 'sent' ?
  this.finalizeAuctionInfo() : this.finalizeAuctionForm();
}

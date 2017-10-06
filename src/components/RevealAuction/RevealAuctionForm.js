import React from 'react';
import moment from 'moment'
import classNames from 'classnames/bind';
import './RevealAuctionForm.css';

const FormComponent = (props) => (
  <form onSubmit={props.handelRevealFormSubmit}>
    <div>
      <label>
        Email:
        <input
          name="email"
          type="email"
          placeholder="youremail@example.com"
          value={props.email}
          onChange={props.handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        ETH:
        <input
          name="ethBid"
          type="text"
          placeholder="0.01"
          value={props.ethBid}
          onChange={props.handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Secret:
        <input
          name="secret"
          type="text"
          placeholder="password"
          value={props.secret}
          onChange={props.handleInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Gas Price:
        <input
          name="gas"
          type="text"
          value={props.gas}
          onChange={props.handleInputChange}
        />
      </label>
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
)

export const RevealAuctionForm = (props) => {
  const timelineState = classNames(props.duringReveal === 'before' ? '' : 'hidden');
  const startsFromNow = moment(props.startsAt).fromNow();
  const endsFromNow = moment(props.endsAt).fromNow();

  return (
    <div>
      <h2>{props.searchResult.searchName}.eth</h2>
      <div>
        <div className={timelineState}>
          <p>Reveal Bids On</p>
          <div>{props.startsAt}</div>
          <div>{startsFromNow}</div>
        </div>
        <div>
          <p>Auction Close On</p>
          <div>{props.endsAt}</div>
          <div>{endsFromNow}</div>
        </div>
      </div>
      { props.duringReveal === 'during' ? 
        <FormComponent {...props} /> : '' }
    </div>
  );
};

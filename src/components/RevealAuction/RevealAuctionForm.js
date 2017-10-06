import React from 'react';
import './RevealAuctionForm.css';

export const RevealAuctionForm = (props) => (
  <div>
    <h2>{props.searchResult.searchName}.eth</h2>
    <div>
      Timeline
    </div>
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
          Secert:
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
  </div>
);

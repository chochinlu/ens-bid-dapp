import React from 'react';
import './StartAuctionForm.css';

export const StartAuctionForm = (props) => (
  <form onSubmit={props.handleAuctionFormSubmit}>
    <h2>{props.searchResult.searchName}.eth</h2>
    <div>
      <div>
        <lable>Email: 
          <input 
            name="email"
            type="email" 
            placeholder="youremail@example.com"
            value={props.email}
            onChange={props.handleInputChange}
          />
        </lable>
      </div>
      <div>
        <lable>ETH: 
          <input 
            name="ethBid"
            type="text"
            placeholder="0.01"
            value={props.ethBid}
            onChange={props.handleInputChange}
          />
        </lable>
      </div>
      <div>
        <lable>Secret:
          <input
            name="secret"
            type="text"
            placeholder="password"
            value={props.secret}
            onChange={props.handleInputChange}
          />
        </lable>
      </div>
      <div>
        <label>Gas Price: 
          <input
            name="gas"
            type="text"
            value={props.gas}
            onChange={props.handleInputChange}
          />
        </label>
      </div>
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
)
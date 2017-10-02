import React from 'react';
import './RevealAuctionForm.css';

export const RevealAuctionForm = () => (
  <div>
    <h2>mybidens.eth</h2>
    <div>
      Timeline
    </div>
    <form>
      <div>
        <label>Email</label>
        <input type="email" value="" placeholder="youremail@example.com"/>
      </div>
      <div>
        <label>ETH</label>
        <input type="text" value="" placeholder="0.01"/>
      </div>
      <div>
        <label>Secert</label>
        <input type="text" value="" placeholder="password"/>
      </div>
      <div>
        <label>Gas Price</label>
        <input type="text" value=""/>
      </div>
    </form>
    <div>
      <button>Reveal Auction</button>
    </div>
  </div>
);

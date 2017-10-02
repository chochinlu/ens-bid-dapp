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
        <label>
          Email:
          <input type="email" value="" placeholder="youremail@example.com"/>
        </label>
      </div>
      <div>
        <label>
          ETH:
          <input type="text" value="" placeholder="0.01"/>
        </label>
      </div>
      <div>
        <label>
          Secert:
          <input type="text" value="" placeholder="password"/>
        </label>
      </div>
      <div>
        <label>
          Gas Price:
          <input type="text" value=""/>
        </label>
      </div>
    </form>
    <div>
      <button>Reveal Auction</button>
    </div>
  </div>
);

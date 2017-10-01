import React from 'react';
import './StartAuctionForm.css';

export const StartAuctionForm = () => (
  <div>
    <h2>mybidens.eth</h2>
    <div>
      <div>
        <div>Email: </div>
        <div>
          <input type="email" value="" placeholder="youremail@example.com"/>
        </div>
      </div>
      <div>
        <div>ETH: </div>
        <div>
          <input type="text" value="" placeholder="0.01"/>
        </div>
      </div>
      <div>
        <div>Secert: </div>
        <div>
          <input type="text" value="" placeholder="password"/>
        </div>
      </div>
      <div>
        <div>Gas Price: </div>
        <div>
          <input type="text" value=""/>
        </div>
      </div>
    </div>
    <div>
      <button>Start Auction</button>
    </div>
  </div>
);
import React from 'react';
import './StartAuctionInfo.css';

export const StartAuctionInfo = () => (
  <div>
    <h2>mybidens.eth</h2>
    <div>
      <div>
        <div>Email: </div>
        <div>
          youremail@example.com
        </div>
      </div>
      <div>
        <div>ETH: </div>
        <div>
          0.01
        </div>
      </div>
      <div>
        <div>Secert: </div>
        <div>
          password
        </div>
      </div>
      <div>
        <div>TxHash: </div>
        <div>
          0x0
        </div>
      </div>
      <p>We've send you the auction information Email.</p>
    </div>
    <div>
      <button>Back to Search</button>
      <button>My ENS List</button>
    </div>
  </div>
);
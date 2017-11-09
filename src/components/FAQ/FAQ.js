import React from 'react';
import Paper from 'material-ui/Paper';
import './FAQ.css';

export const FAQ = () => (
  <div className="FAQ">
    <Paper >
      <h1>FAQ</h1>
      <p><span>How to buying an ENS Name?</span></p>
      <p>Unlike dns names, ens names are bought via 5 day vickery auction.
        There is only one top level name .eth, and only names with 7 or more letters is allowed.
        However, since every level is controlled by Smart Contracts, any name can act as a top level domain.
      </p>
    </Paper>
  </div>
);
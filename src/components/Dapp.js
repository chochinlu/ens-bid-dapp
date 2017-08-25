import React from 'react';
import BlockNumber from './BlockNumber';
import SearchBar from './SearchBar';
import AccountBar from './AccountBar';
import EnsCard from './EnsCard';
import './Dapp.css';

export const Dapp = () => (
  <div>
    <BlockNumber />
    <hr />
    <SearchBar />
    <hr />
    <EnsCard />
    <hr />
    <AccountBar />
  </div>
);
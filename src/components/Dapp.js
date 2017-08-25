import React from 'react';
import BlockNumber from './BlockNumber';
import {JsonKeyUploader} from './JsonKeyUploader';
import SearchBar from './SearchBar';
import AccountBar from './AccountBar';
import EnsCard from './EnsCard';
import './Dapp.css';

export const Dapp = () => (
  <div>
    <BlockNumber />
    <SearchBar />
    <EnsCard />
    <JsonKeyUploader />
    <AccountBar />
  </div>
);
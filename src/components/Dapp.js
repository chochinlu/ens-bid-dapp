import React from 'react';
import BlockNumber from './BlockNumber';
import AddressSearch from './AddressSearch';
import {JsonKeyUploader} from './JsonKeyUploader'; 
import SearchBar from './SearchBar';
import AccountBar from './AccountBar';
import EnsCard from './EnsCard';
import './Dapp.css';

export const Dapp = () => (
  <div>
    <BlockNumber />
    <AddressSearch />
    <SearchBar />
    <EnsCard />
    <JsonKeyUploader />
    <AccountBar />
  </div>
);
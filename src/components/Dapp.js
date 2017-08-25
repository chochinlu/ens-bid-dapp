import React from 'react';
import BlockNumber from './BlockNumber';
import AddressSearch from './AddressSearch';
import {JsonKeyUploader} from './JsonKeyUploader'; 
import SearchBar from './SearchBar';
import EnsCard from './EnsCard';

export const Dapp = () => (
  <div>
    <BlockNumber />
    <AddressSearch />
    <SearchBar />
    <EnsCard />
    <JsonKeyUploader />
  </div>
);
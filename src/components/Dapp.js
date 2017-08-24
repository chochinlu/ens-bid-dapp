import React from 'react';
import BlockNumber from './BlockNumber';
import AddressSearch from './AddressSearch';
import {JsonKeyUploader} from './JsonKeyUploader'; 

export const Dapp = () => (
  <div>
    <BlockNumber />
    <AddressSearch />
    <JsonKeyUploader />
  </div>
);
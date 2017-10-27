import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import './Network.css';

export const Network = (props) => {
  return (
    <Select
      className="Network-select"
      value={props.network}
      onChange={props.handleChange('network')}>
      <MenuItem value="ropsten">Network: Ropsten</MenuItem>
    </Select>
  );
};
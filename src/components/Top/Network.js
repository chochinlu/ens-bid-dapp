import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
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
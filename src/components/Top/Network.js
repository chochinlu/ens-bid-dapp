import React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import './Network.css';

export const Network = (props) => {
  return (
    <div className="Network">
      <i className="material-icons">public</i>&nbsp;
      <Select
        className="Network-select"
        value={props.network}
        onChange={props.handleChange('network')}>
        <MenuItem value="ropsten" className="Network-MenuItem">Network: Ropsten</MenuItem>
      </Select>
    </div>
  );
};
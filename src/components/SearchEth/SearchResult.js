import React from 'react';

export const SearchResult = (props) => {
  const result = props.result;
  return result &&
    (
      <div className="SearchEth-result">
        <h3>Search result: </h3>
        <p>State: {result.state}</p>
        <p>Deed: {result.deed}</p>
        <p>Registration Date: {JSON.stringify(result.registrationDate)}</p>
        <p>Value: {result.value}</p>
        <p>Highest Bid: 0</p>
      </div>
    )
};
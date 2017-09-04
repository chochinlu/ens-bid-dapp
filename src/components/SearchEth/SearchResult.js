import React from 'react';

export const SearchResult = (props) => {
  const result = props.result;
  return result &&
    (
      <div className="SearchEth-result">
        <div className="SearchEth-result-name">
          <h3>{result.searchName}.eth</h3>
        </div>
        <div className="SearchEth-result-action">
          <h3>{result.state}</h3>
        </div>
      </div>
    )
};
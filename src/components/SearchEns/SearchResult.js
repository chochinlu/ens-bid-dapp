import React from 'react';

export const SearchResult = (props) => {
  const result = props.result;
  return result &&
    (
      <div className="SearchEns-result">
        <div className="SearchEns-result-name">
          <h3>{result.searchName}.eth</h3>
        </div>
        <div className="SearchEns-result-action">
          <h3>{result.state}</h3>
        </div>
      </div>
    )
};
import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import './SearchResult.css';

const SearchResultItem = (props) => {
  return (  
    <Paper className="SearchResult-paper">
      <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-front">
        {props.name}.eth
      </Typography>
      <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-status">
        <p>Status</p>
        <p>{props.state}</p>
      </Typography>
      <div className="SearchResultBtn" onClick={() => props.switchPage('auction')}>
        <IconButton aria-label="Buy Now">
          <i class="material-icons">shopping_cart</i>
        </IconButton>
      </div>
    </Paper>
  );
};

export const SearchResult = (props) => {
  const result = props.result;
  return result &&
    (
      <div className="SearchResult">
        <SearchResultItem 
          name={result.searchName} 
          state={result.state}
          switchPage={props.switchPage}/>
        <SearchResultItem 
          name={result.searchName} 
          state={result.state}
          switchPage={props.switchPage}/>
      </div>
    );
};
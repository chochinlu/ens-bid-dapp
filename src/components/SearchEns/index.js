import React, {Component} from 'react';
import {SearchResult} from './SearchResult';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import './SearchEns.css';

const SearchDescription = () => (
  <div className="SearchDescription">
    <h1>Your Identity on Ethereum</h1>
  </div>
);

const SearchInput = (props) => {
  return (
    <Paper className="SearchEns-paper">
      <Input
        className="SearchEns-input"
        placeholder="Search"
        minlength="7"
        inputProps={{
          'aria-label': 'Search',
        }}
        disableUnderline
        value={props.value}
        onChange={props.handleSearchChange}
        onKeyPress={props.handleSearchKeyPress}
      />
      <Typography type="title" component="p" className="SearchEns-typography">
        .eth
      </Typography>
      <IconButton aria-label="Search" onClick={props.handleSearchClick}>
        <i className="material-icons">search</i>
      </IconButton>
    </Paper>
  );
};

export class SearchEns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  render() {
    return (
      <div className="SearchEns">
        <SearchDescription />
        <SearchInput 
          value={this.props.searchValue}
          handleSearchChange={this.props.handleSearchChange}
          handleSearchClick={this.props.handleSearchClick}
          handleSearchKeyPress={this.props.handleSearchKeyPress}
        />

        {this.props.searchFetching
          ? <h3>Fetching...</h3>
          : <SearchResult
            {...this.props} />
        }
      </div>
    );
  }
}

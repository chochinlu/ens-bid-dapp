import React, {Component} from 'react';
import {SearchResult} from './SearchResult';
import './SearchEns.css';

const SearchDescription = () => (
  <div>
    <h1>Your Identity on Ethereum</h1>
  </div>
);

const SearchInput = (props) => (
  <div className="SearchEns-search">
    <div>
      <input
        type="text"
        placeholder='.eth'
        value={props.value}
        onChange={props.handleSearchChange}/>
    </div>
    <div className="SearchEns-btn" onClick={props.handleSearchClick}>Search</div>
  </div>
);

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
        />

        {this.props.SearchFetching
          ? <h3>Fetching...</h3>
          : <SearchResult
            switchPage={this.props.switchPage}
            result={this.props.searchResult} />
        }
      </div>
    );
  }
}

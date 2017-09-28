import React, {Component} from 'react';
import {entries} from '../../lib/ensService';
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
        onChange={props.handleChange}/>
    </div>
    <div className="SearchEns-btn" onClick={props.handleSearch}>Search</div>
  </div>
);

export class SearchEns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: null,
      message: '',
      fetching: false
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();

    if (this.state.value) {
      this.setState({fetching: true}); //TODO: not work
      const result = entries(this.state.value);
      result.searchName = this.state.value;
      this.setState({
        result,
        value: '',
        fetching: false
      });
    }
  }

  render() {
    return (
      <div className="SearchEns">
        <SearchDescription />
        <SearchInput 
          value={this.state.value}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />

        {this.state.fetching
          ? <h3>Fetching...</h3>
          : <SearchResult result={this.state.result} />
        }
      </div>
    );
  }
}

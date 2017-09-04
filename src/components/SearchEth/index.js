import React, {Component} from 'react';
import {entries} from '../../lib/ensService';
import {SearchResult} from './SearchResult';
import './SearchEth.css';

export class SearchEth extends Component {
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
      <div className="SearchEth">
        <div className="SearchEth-search">
          <div>
            <input
              type="text"
              placeholder='.eth'
              value={this.state.value}
              onChange={this.handleChange}/>
          </div>
          <div className="SearchEth-btn" onClick={this.handleSearch}>Search</div>
        </div>
        {this.state.fetching
          ? <h3>Fetching...</h3>
          : <SearchResult result={this.state.result} />
        }
      </div>
    );
  }
}

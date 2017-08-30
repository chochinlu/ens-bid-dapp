import React, {Component} from 'react';
import {getAddressByEns, entries} from '../../lib/ensService';
import {SearchResult} from './SearchResult';
import './SearchEth.css';

export class SearchEth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: null,
      message: ''
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleClear = this.handleClear.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleClear() {
    this.setState({value: ''});
  }

  handleSearch(e) {
    e.preventDefault();

    if (this.state.value) {
      const result = entries(this.state.value);
      // console.log(result);
      this.setState({result});
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
          <div className="SearchEth-btn" onClick={this.handleClear}>Clear</div>
        </div>
        <SearchResult result={this.state.result} />
      </div>
    );
  }
}

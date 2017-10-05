import React, {Component} from 'react';
import {SearchEns} from './SearchEns';
import {Content} from './Content';
import {FAQ} from './FAQ';
import {About} from './About';
import {AuctionWrapper} from './AuctionWrapper/AuctionWrapper';
import {entries} from '../lib/ensService';
import './MainWrapper.css';

const Main = (props) => (
  <div>
    <SearchEns
      {...props} />
    <Content />
    <FAQ />
    <About />
  </div>
);

export class MainWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchResult: null,
      searchFetching: false
    };
    this.handleChange = this.handleChange.bind(this); 
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();

    if (this.state.searchValue) {
      this.setState({fetching: true}); //TODO: not work
      const searchResult = entries(this.state.searchValue);
      searchResult.searchName = this.state.searchValue;
      this.setState({
        searchResult,
        searchValue: '',
        searchFetching: false
      });
    }
  }

  getPage() {
    switch (this.props.page) {
      case 'main':
        return (
          <Main
            {...this.state}
            handleChange={this.handleChange}
            handleSearch={this.handleSearch}
            switchPage={this.props.switchPage}
          />
        );
      case 'auction':
        return (
          <AuctionWrapper
            searchResult={this.state.searchResult}
          />
        );
      default:
        return <Main/>;
    }
  }

  render() {
    return this.getPage();
  }
}
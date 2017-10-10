import React, {Component} from 'react';
import {SearchEns} from './SearchEns';
import {Content} from './Content';
import {FAQ} from './FAQ';
import {About} from './About';
import {AuctionWrapper} from './AuctionWrapper/AuctionWrapper';
import {entries} from '../lib/ensService';
import './MainWrapper.css';

const Main = (props) => (
  <div className="Main">
    <SearchEns
      {...props} />
    <About/>
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
    this.handleSearchChange = this.handleSearchChange.bind(this); 
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearchClick(e) {
    e.preventDefault();

    if (this.state.searchValue) {
      this.setState({fetching: true}); //TODO: not work
      const searchResult = entries(this.state.searchValue);
      searchResult.searchName = this.state.searchValue;
      this.setState({
        searchResult,
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
            handleSearchChange={this.handleSearchChange}
            handleSearchClick={this.handleSearchClick}
            switchPage={this.props.switchPage}
          />
        );
      case 'auction':
        return (
          <AuctionWrapper
            {...this.props}
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
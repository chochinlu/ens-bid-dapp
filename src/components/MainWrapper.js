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
      searchFetching: false,
      step: 'StartAuction'
    };
    this.handleSearchChange = this.handleSearchChange.bind(this); 
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
    this.setStep = this.setStep.bind(this);
  }

  handleSearchChange(e) {
    this.setState({searchValue: e.target.value});
  }

  handleSearchKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSearchClick(e);
    }
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

  setStep(name) {
    this.setState({step: name});
  }

  getPage() {
    switch (this.props.page) {
      case 'main':
        return (
          <Main
            {...this.state}
            {...this.props}
            handleSearchChange={this.handleSearchChange}
            handleSearchClick={this.handleSearchClick}
            handleSearchKeyPress={this.handleSearchKeyPress}
            setStep={this.setStep}
          />
        );
      case 'auction':
        return (
          <AuctionWrapper
            {...this.props}
            step={this.state.step}
            setStep={this.setStep}
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
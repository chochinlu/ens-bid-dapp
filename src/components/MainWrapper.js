import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
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
      step: 'StartAuction',
      message: '',
      open: false,
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

  handleMessageOpen = msg => {
    this.setState({ open: true, message: msg });
  };

  handleMessageClose = () => {
    this.setState({ open: false });
  };

  handleSearchClick(e) {
    e.preventDefault();
    if ((this.state.searchValue).length < 7) {
      this.handleMessageOpen('should greater than 7 words');
    } else {
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
    return (
      <div className="Main">
        {this.getPage()}
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={6000}
          open={this.state.open}
          onRequestClose={this.handleMessageClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleMessageClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
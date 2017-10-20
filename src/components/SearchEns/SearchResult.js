import React, {Component} from 'react';
import {checkBeforeNow} from '../../lib/util';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import './SearchResult.css';

class SearchResultItem extends Component {
  handleClick() {
    let step = '';
    switch (this.props.searchResult.state) {
      case 'Open':
      case 'Auction':
        step = 'StartAuction';
        break;
      case 'Reveal':
        // check the current time is before registration date or not
        step = 'RevealAuction';

        if (!checkBeforeNow(this.props.searchResult.registratesAt)) {
          // check this person if he is the first price bidder of this domain
          step = 'FinalizeAuction';
        }
        break;
      // case 'Owned':
      //   TODO 
      //     - check after reveal state
      //     - to start another auction request 
      //   break;
      default:
        // forbidden / not yet available do nothing
        alert('the domain name service is not available');
    }

    this.props.setStep(step);
    this.props.switchPage('auction');
  }

  render() {
    const actionBtn = (this.props.searchResult.state === 'Auction' || 
      this.props.searchResult.state === 'Open' || 
      this.props.searchResult.state === 'Reveal') ?
      <div className="SearchResultBtn" onClick={() => this.handleClick()}>
        <IconButton aria-label="Buy Now">
          <i className="material-icons">shopping_cart</i>
        </IconButton>
      </div> : 
      <div className="SearchResultBtn">
        <IconButton aria-label="Owned">
          <i className="material-icons">not_interested</i>
        </IconButton>
      </div>;

    return (
      <Paper className="SearchResult-paper">
        <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-front">
          {this.props.searchResult.searchName}.eth
        </Typography>
        <Typography type="title" component="div" className="SearchResult-typography SearchResult-typography-status">
          <p>Status</p>
          <p>{this.props.searchResult.state}</p>
        </Typography>
        {actionBtn}
      </Paper>
    );
  }
}

export const SearchResult = (props) => {
  const result = props.searchResult;
  return result &&
    (
      <div className="SearchResult">
        <SearchResultItem
          {...props}
        />
      </div>
    );
};
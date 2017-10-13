import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import './SearchResult.css';

class SearchResultItem extends Component {
  handleClick() {
    if ((this.props.searchResult.searchName).length < 7) return alert('should greater than 7 words');
    
    // validate user login
    if (!(this.props.address && this.props.privateKey)) return alert('should login first');

    let step = '';
    switch (this.props.searchResult.state) {
      case 'Auction', 'Open':
        // 1. aution / open go to start acution
        step = 'StartAuction';
        break;
      case 'Reveal':
        // 2. reveal go to reveal auction
        step = 'RevealAuction';
        break;
      case 'Owned':
        // 3. owned go to finialze auction 
        // TODO check if the person should be the one finalize it
        step = 'FinalizeAuction';
        break;
      default:
        // 4. forbidden / not yet available do nothing
        alert('the domain name service is not available');
    }

    this.props.setStep(step);
    this.props.switchPage('auction');
  }

  render() {
    return (
      <Paper className="SearchResult-paper">
        <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-front">
          {this.props.searchResult.searchName}.eth
        </Typography>
        <Typography type="title" component="p" className="SearchResult-typography SearchResult-typography-status">
          <p>Status</p>
          <p>{this.props.searchResult.state}</p>
        </Typography>
        <div className="SearchResultBtn" onClick={() => this.handleClick()}>
          <IconButton aria-label="Buy Now">
            <i class="material-icons">shopping_cart</i>
          </IconButton>
        </div>
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